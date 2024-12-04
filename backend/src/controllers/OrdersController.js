import { Op } from "sequelize";
import OrdersModel from "../models/OrderModel.js";
import { isNumber } from "../utils/isNumber.js";

export default  class OrdersController {
    async createOrUpdate(orderID, products = [], orderWorth){
        if(
            !Array.isArray(products) 
        ) throw new Error('Products param must be array.')



        const recordExist =await  OrdersModel.findByPk( orderID );
        if (!recordExist) { // Create new object
            OrdersModel.create({
                orderID,
                products: JSON.stringify( products ),
                orderWorth
            })
        } else { 
            OrdersModel.update({
                products: JSON.stringify( products ),
                orderWorth
            }, { where: { orderID: recordExist.dataValues.orderID}})
        }
    }

    async getById( orderID){
        return await OrdersModel.findByPk( orderID )
    }

    async getAll( 
        {
            minWorth = null, 
            maxWorth = null
        }
    ){
        if (minWorth && !isNumber(minWorth)) throw new Error("attribute minWorth must be null or number");
        if (maxWorth && !isNumber(maxWorth)) throw new Error("attribute minWorth must be null or number");

        const whereOptions = {};

        if(minWorth && maxWorth) whereOptions[Op.between] = [minWorth, maxWorth] 
        else if (minWorth && !maxWorth) whereOptions[Op.gte] = minWorth
        else if (!minWorth && maxWorth) whereOptions[Op.lte] = maxWorth
        
        return await OrdersModel.findAll();
    }
}
