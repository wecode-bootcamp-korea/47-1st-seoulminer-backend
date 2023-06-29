const bcrypt = require("bcrypt");
const { userDao } = require("../models");

const signUp = async (email, password, name, phoneNumber) => {
  const saltRounds = 12;

  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[!@#$%^&*()-=_+])[a-zA-Z\d!@#$%^&*()-=_+]{10,16}$/;

  if (!emailRegEx.test(email)) {
    const error = new Error("INVALID_EMAIL");
    error.statusCode = 400;

    throw error;
  }
  if (!passwordRegEx.test(password)) {
    const error = new Error("INVALID_PASSWORD");
    error.statusCode = 400;

    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return await userDao.createUser(email, hashedPassword, name, phoneNumber);
};

module.exports = { signUp };
