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
                len: [4, 15]
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
                len: [6, 10]
            }
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        }
    },
        {
            freezeTableName: true,
            timestamps: false
        });
}