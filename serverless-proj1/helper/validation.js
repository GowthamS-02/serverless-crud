// const { ENTER_NAME, STRING_NAME, NAME_LENGTH, ENTER_EMAIL, VALID_EMAIL, ENTER_PASSWORD, PASS_LENGTH } = require('./validationmsg.js')
const validMsg = require('./validationmsg');
module.exports.validInput = (name, email, password) => {
  if (!name) {
    return validMsg.ENTER_NAME;
  }
  else if (typeof name !== 'string') {
    return validMsg.STRING_NAME;
  }
  else if (name.length < 4) {
    return validMsg.NAME_LENGTH;
  }
  else if (!email) {
    return validMsg.ENTER_EMAIL;
  }
  else if (!validMail(email)) {
    return validMsg.VALID_EMAIL;
  }

  else if (!password) {//string
    return validMsg.ENTER_PASSWORD;
  }
  else if (password.length < 6) {
    return validMsg.PASS_LENGTH;
  }
}
let validMail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}