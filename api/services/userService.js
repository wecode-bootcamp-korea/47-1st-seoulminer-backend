const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDao } = require("../models");

const signUp = async (email, password, name, phoneNumber) => {
  const saltRounds = 12;

  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[!@#$%^&*()-=_+])[a-zA-Z\d!@#$%^&*()-=_+]{10,16}$/;

  const emailExist = await userDao.userExistByEmail(email);
  const phoneNumberExist = await userDao.userExistByPhoneNumber(phoneNumber);
  const defaultPoints = 10000000;

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

  if (emailExist.exist > 0) {
    const error = new Error("EMAIL_EXIST");
    error.statusCode = 409;

    throw error;
  }

  if (phoneNumberExist.exist > 0) {
    const error = new Error("PHONE_NUMBER_EXIST");
    error.statusCode = 409;

    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return await userDao.createUser(
    email,
    hashedPassword,
    name,
    phoneNumber,
    defaultPoints
  );
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const error = new Error("USER_IS_NOT_VALID");
    error.statusCode = 401;
    throw error;
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const error = new Error("USER_IS_NOT_VALID");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

module.exports = { signUp, signIn };
