const Sequelize = require('sequelize');
const sequelize = require('../database/database.js');
const User = require('../models/user.js')


module.exports.userdata = async (event) => {
    await User.sync({ alter: true });
    try {
        userObj = await User.findAll();
        return {
            statusCode: 201,
            body: JSON.stringify(userObj)
        }
    }
    catch (error) {
        console.log(error);
        return {
            statusCode: error.statusCode,
            body: JSON.stringify({ error: error.message })
        }
    }
};