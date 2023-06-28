const bcrypt = require("bcrypt");
const { userDao } = require("../models");

const signUp = async (email, password, name, phoneNumber) => {
  const saltRounds = 12;
  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
  };

  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[!@#$%^&*()-=_+])[a-zA-Z\d!@#$%^&*()-=_+]{10,16}$/;

  if (!emailRegEx.test(email)) return res.status(400).json({ message: "INVALID_EMAIL" });
  if (!passwordRegEx.test(password)) return res.status(400).json({ message: "INVALID_PASSWORD" });

  const hashedPassword = await makeHash(password, saltRounds);

  return await userDao.createUser(email, hashedPassword, name, phoneNumber);
};

module.exports = { signUp };
