const {database, User} = require('../database.js');
const {UserModel} = require('../controller/user.js');
const {response} = require('../helper/helper.js');

module.exports.userdata = async (event) => {
  await User.sync({ alter: true });
  await database();
  try {
    if((event.body) !==  null){
    const { name, email, password } = JSON.parse(event.body);
    let userObj = {
      name,
      email,
      password
    }
    userObj = await User.create(userObj);
    return response (201, userObj, "New user Created")
  }else{
   return response (400, " ", "user data not valid")
  }

  }
  catch (error) {
    console.log(error);
    return response(error.statusCode, { error: error.message }, error);

  }
};