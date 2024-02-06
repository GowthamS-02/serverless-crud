const { database, User } = require('../database.js');
const { UserModel } = require('../controller/user.js');
const { response, validMail } = require('../helper/helper.js');

module.exports.userdata = async (event) => {
  await User.sync({ alter: true });
  await database();
  try {
    if ((event.body) !== null) {
      const { name, email, password } = JSON.parse(event.body);
      //validation
      if (!name || typeof name !== 'string' || name.length < 3) {
        return response(400, null, "Name is required and must be a non-empty string.");
      }

      if (!email || typeof email !== 'string' || !validMail(email)) {
        return response(400, null, "Email is required and must be a valid email address.");
      }

      if (!password || password.length < 6) {
        return response(400, null, "Password is required and atleast have minimum of 6 characters")
      }

      let userObj = {
        name,
        email,
        password
      }

      userObj = await User.create(userObj);
      return response(201, userObj, "New user Created")
    } else {
      return response(400, " ", "user data not valid")
    }

  }
  catch (error) {
    console.log(error);
    return response(error.statusCode, { error: error.message }, error);

  }
};