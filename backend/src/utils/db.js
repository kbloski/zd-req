import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

function authenticateDatabase(){
    sequelize.authenticate()
    .then( () => console.log('Connected with database.'))
    .catch( err => console.error('Don\'t connect with database.'))
}

export {
    sequelize,
    authenticateDatabase
}