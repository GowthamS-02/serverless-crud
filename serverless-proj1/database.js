const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();
const {UserModel} = require('./controller/user.js');

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize('project2', username, password, {
    dialect: 'mysql'
});

database = () => {
    sequelize.authenticate().then(() => {
        console.log("Connection Established!");
    }).catch((err) => {
        console.log("Error connecting to database!");
    });

}
const User = UserModel(Sequelize, sequelize);

module.exports = { database, User};