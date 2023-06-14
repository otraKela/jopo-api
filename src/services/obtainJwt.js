const jwt = require('jsonwebtoken');

const envVariables= require('../../env-variables.json');
const nodeEnv = process.env.NODE_ENV || 'development';

const obtainJwt = (user) => {

  let jwtPayload = {
    userEmail: user.email,
    userName: user.first_name,
    userImg: user.img,
    userId: user.id
  }

  const token = jwt.sign(jwtPayload, envVariables[nodeEnv].SECRET);

  return token;

}

module.exports = obtainJwt;
