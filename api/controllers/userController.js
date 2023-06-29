const { userDao } = require("../models");
const { userService } = require("../services");

const signUp = async (req, res) => {
  try {
    const { email, password, name, phoneNumber } = req.body;

    const emailExist = await userDao.userExistByEmail(email);
    const phoneNumberExist = await userDao.userExistByPhoneNumber(phoneNumber);

    if (!email || !password || !name || !phoneNumber) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;

      throw error;
    }

    if (emailExist[0].count > 0) {
      const error = new Error("EMAIL_EXIST");
      error.statusCode = 409;

      throw error;
    }

    if (phoneNumberExist[0].count > 0) {
      const error = new Error("PHONE_NUMBER_EXIST");
      error.statusCode = 409;

      throw error;
    }

    await userService.signUp(email, password, name, phoneNumber);
    return res.status(201).json({ message: "CREATE_USER_SUCCESS!" });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { signUp };
