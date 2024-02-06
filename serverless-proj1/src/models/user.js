const Sequelize = require('sequelize');
const sequelize = require('../../database.js');

module.exports.User =(Sequelize, sequelize) => {
 sequelize.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    },

}, 
    {
        freezeTableName: true,
        timestamps: false
    });
// module.exports = User;
}