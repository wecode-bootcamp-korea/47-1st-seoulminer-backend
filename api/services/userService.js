const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userDao } = require('../models');

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const error = new Error("USER_IS_NOT_VALID")
    error.statusCode = 401;
    throw error;
  }

  // uncomment when signup is done
  // const isMatched = await bcrypt.compare(password, user.password);
  const isMatched = (password == user.password)
  
  if (!isMatched) {
    const error = new Error("PASSWORD_IS_NOT_VALID")
    error.statusCode = 401;
    throw error;
  }

  else {
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token
  }
}

module.exports = {
  signIn
}