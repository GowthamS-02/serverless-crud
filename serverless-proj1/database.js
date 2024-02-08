const Sequelize = require('sequelize');
require('dotenv').config();
const { UserModel } = require('./controller/user.js');

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

const sequelize = new Sequelize(db_name, username, password, {
    dialect: 'mysql'
});

const User = UserModel(Sequelize, sequelize);
const models = { User };
const database = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection Established!");
        return models;
    }
    catch (err) {
        console.log("Error connecting to database:", err);
    };
 
}
module.exports = database;