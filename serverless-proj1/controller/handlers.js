const database = require('../database.js');
const { response, validInput, res2 } = require('../helper/helper.js');

module.exports.newUser = async (event) => {
  const models = await database();
  try {
    if ((event.body) !== null) {
      const { name, email, password } = JSON.parse(event.body);
      //validation
      let validation = await validInput(name, email, password);
      console.log(validation);
      if (!validation) {

        const { User } = models;

        let userObj = {
          name,
          email,
          password
        }
        let newUser = await User.create(userObj);
        return response(201, newUser, "New user Created");
      }
      else {
        return response(400, "", validation);
      }
    } else {
      return response(400, " ", "Enter User data")
    }

  }
  catch (error) {
    console.log(error);
    return response(error.statusCode, { error: error.message }, error);
  }
};



module.exports.allUsers = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    let userObj = await User.findAll();

    if (userObj) {
      return res2(201, userObj, "Data Found");
    }
    else {
      return response(404, "", "Data is not found")
    }

  }
  catch (error) {
    console.log(error);
    return response(error.statusCode, { error: error.message }, error);

  }
};

module.exports.getUser = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    const { email } = event.pathParameters;
    let userObj = await User.findOne({ where: { email } });

    if (userObj) {
      return res2(201, userObj, "Data Found");
    }
    else {
      return response(404, "", "Requested user is not found")
    }

  }
  catch (error) {
    console.log(error);
    return response(error.statusCode, { error: error.message }, error);

  }
};


module.exports.updateData = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    const { user_id } = event.pathParameters;
    const { name, email, password } = JSON.parse(event.body);
    //validation
console.log(name);
    let userObj = {
      name,
      email,
      password
    };

    if (userObj) {
      let updateUser = await User.update(userObj, { where: { user_id } });
      return response(201, updateUser, "Data Updated");
    }
    else {
      return response(404, "", "Requested user is not found")
    }
  }
  catch (error) {
    console.log(error);
    return response(error.statusCode, { error: error.message }, error);

  }
};


module.exports.deleteUser = async (event) => {
  const models = await database();
  const { User } = models;
  try {
    const { user_id } = event.pathParameters;
   let userObj = await User.destroy( { where: { user_id } });
    
    if (userObj) {
        return response(201, userObj, "Data Deleted");
    }
    else {
        return response(404, "", "Requested user is not found")
    }
  }
  catch (error) {
    console.log(error);
    return response(error.statusCode, { error: error.message }, error);
  }
};