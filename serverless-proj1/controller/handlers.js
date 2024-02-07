const database = require('../database.js');
const { response, res2 } = require('../helper/helper.js');
const { validInput } = require('../helper/validation.js')
const message = require('../helper/message.js')

module.exports.createNewUser = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    if ((event.body) === null) {
      return response(400, " ", message.ENTER_DATA);
    }

    const { name, email, password } = JSON.parse(event.body);
    //validation
    let validation = await validInput(name, email, password);
    console.log(validation);

    if (validation) {
      return response(400, "", validation);
    }

    let userObj = {
      name,
      email,
      password
    };
    let newUser = await User.create(userObj);
    return response(201, newUser, message.USER_CREATE);
  }
  catch (error) {
    console.log(error);
    return response(404, error, error);
  }
};

module.exports.getAllUsers = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    let userObj = await User.findAll({ attributes: [['name', 'Username'], ['email', 'User-mail']], where: { is_deleted: 0 }, order: [['name', 'ASC']] });
    if ((userObj.length) === 0) {
      return response(200, "", message.NO_DATA);
    }
    return res2(201, userObj, message.FOUND_DATA);
  }
  catch (error) {
    console.log(error);
    return response(error.statusCode, { error: error.message }, error);
  }
};

module.exports.getSingleUser = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    const { email } = event.pathParameters;
    let userObj = await User.findOne({ attributes: [['name', 'Username'], ['email', 'User-mail']], where: { email, is_deleted: 0 } });

    if (!userObj) {
      return response(404, "", message.REQ_NOT_FOUND);
    }
    return res2(201, userObj, message.FOUND_DATA);
  }
  catch (error) {
    console.log(error);
    return response(404, error, error);
  }
};

module.exports.updateUserData = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    const { user_id } = event.pathParameters;
    const UserId = await User.findOne({ where: { user_id, is_deleted: 0 } });
    if (!UserId) {
      return response(404, "", message.REQ_NOT_FOUND);
    }

    const { name, email, password } = JSON.parse(event.body);
    //validation
    let userObj = { name, email, password };

    let updateUser = await User.update(userObj, { where: { user_id } });
    return response(201, updateUser, message.DATA_UPDATE);
  }
  catch (error) {
    console.log(error);
    return response(404, error, error);
  }
};

module.exports.deleteUser = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    const { user_id } = event.pathParameters;
    const UserId = await User.findOne({ where: { user_id, is_deleted: 0 } });
    if (!UserId) {
      return response(404, "", message.REQ_NOT_FOUND);
    }

    let userObj = await User.update({ is_deleted: 1 }, { where: { user_id } });

    return response(201, userObj, message.DATA_DELETE);
  }
  catch (error) {
    console.log(error);
    return response(404, error, error);
  }
};