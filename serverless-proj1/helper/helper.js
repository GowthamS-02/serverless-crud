module.exports.response = (code, data,msg) => {
    return {
        statusCode: code,
        body: msg
    }
}
module.exports.res2 = (code, data,msg) => { 
       return {
           statusCode: code,
           body: JSON.stringify(data)    
       }
   }


module.exports.validInput = (name, email, password) => {
    if (!name || typeof name !== 'string' || name.length < 3) {
        return  "Name is required and must be a non-empty string.";
      }

    else  if (!email || typeof email !== 'string' || !validMail(email)) {
        return  "Email is required and must be a valid email address.";
      }

     else if (!password || password.length < 6) {
        return  "Password is required and atleast have minimum of 6 characters";
      }
}
let validMail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
}


