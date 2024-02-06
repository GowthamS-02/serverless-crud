const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();
const {UserModel} = require('./controller/user.js');

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize('project2', username, password, {
    dialect: 'mysql'
});

const database = async () => {
    try{
        await sequelize.authenticate()
        console.log("Connection Established!");

        const User = UserModel(Sequelize, sequelize);

        return {User};
    }
    catch(err){
        console.log("Error connecting to database:", err);
    };

}


module.exports = database;