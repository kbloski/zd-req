import { sequelize } from "../utils/db.js";
import OrdersModel from "./OrderModel.js";

// Add relations ....

function syncDatabase(){
    sequelize.sync()
}

export {
    syncDatabase,
    OrdersModel
}