const database = require('../database.js');
const { response } = require('../helper/helper.js');
const { validInput } = require('../helper/validation.js')
const message = require('../helper/message.js')

module.exports.createNewUser = async (event) => {
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
    const models = await database();
    const { User } = models;
    let newUser = await User.create(userObj);
    return response(201, newUser, message.USER_CREATE);
  }
  catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.getAllUsers = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    let userObj = await User.findAll({ attributes: [['name', 'Username'], ['email', 'userMail']], where: { is_deleted: 0 }, order: [['name', 'ASC']] });
    let  msg= message.FOUND_DATA;
    if ((userObj.length) === 0) {
      msg = message.NO_DATA;
    }
    return response(201, userObj, msg);
  }
  catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.getSingleUser = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    const { email } = event.pathParameters;
    let userObj = await User.findOne({ attributes: [['name', 'Username'], ['email', 'User-mail']], where: { email, is_deleted: 0 } });//
   let  msg= message.FOUND_DATA;
    if (!userObj) {
    msg =   message.REQ_NOT_FOUND;
    }
    return response(201, userObj, msg);
  }
  catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.updateUserData = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    const { user_id } = event.pathParameters;
    const UserId = await User.findOne({ where: { user_id, is_deleted: 0 } });
    let  msg= message.DATA_UPDATE;
    if (!UserId) {
      msg =   message.REQ_NOT_FOUND;
    }

    const { name, email, password } = JSON.parse(event.body);
    //validation
    let userObj = { name, email, password };

    let updateUser = await User.update(userObj, { where: { user_id } });
    return response(201, "", msg);
  }
  catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.deleteUser = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    const { user_id } = event.pathParameters;
    const UserId = await User.findOne({ where: { user_id, is_deleted: 0 } });
    let  msg= message.DATA_DELETE;
    if (!UserId) {
      msg =   message.REQ_NOT_FOUND;
    }

    let userObj = await User.update({ is_deleted: 1 }, { where: { user_id } });
    return response(201, "", msg);
  }
  catch (error) {
    console.log(error);
    throw error;
  }
};