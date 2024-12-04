import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

const OrdersModel = sequelize.define('Orders', {
    orderID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    products: DataTypes.STRING(999_999),
    orderWorth: DataTypes.INTEGER
}, {
    timestamps: false
})

export default OrdersModel;