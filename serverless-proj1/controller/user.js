module.exports.UserModel = (Sequelize, sequelize) => {
 return sequelize.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true,
            len: [4,10]
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            len: [6,10]
        }
    },
}, 
    {
        freezeTableName: true,
        timestamps: false
    });
// module.exports = User;
}