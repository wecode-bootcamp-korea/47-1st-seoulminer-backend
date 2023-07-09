const bcrypt = require("bcrypt");

const { adminUserDao } = require("../models");

const adminUserSignUp = async (
  accountName,
  password,
  personalCode,
  name,
  email,
  phoneNumber
) => {
  const confirmedInsider = await adminUserDao.confirmInsiderByEmail(email);

  if (!confirmedInsider) {
    const error = new Error("INVALID_APPROACH");
    error.statusCode = 401;
    throw error;
  }

  const saltRounds = 12;

  const accountNameRegEx = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[!@#$%^&*()-=_+])[a-zA-Z\d!@#$%^&*()-=_+]{10,16}$/;
  const personalCodeRegEx = /^\d{6}$/;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const accountNameExist = await adminUserDao.adminUserExistsByAccountName(
    accountName
  );
  const emailExist = await adminUserDao.adminUserExistsByEmail(email);
  const phoneNumberExist = await adminUserDao.adminUserExistsByPhoneNumber(
    phoneNumber
  );

  if (!accountNameRegEx.test(accountName)) {
    const error = new Error("INVALID_ACCOUNT_NAME");
    error.statusCode = 400;
    throw error;
  }
  if (!passwordRegEx.test(password)) {
    const error = new Error("INVALID_PASSWORD");
    error.statusCode = 400;
    throw error;
  }
  if (!personalCodeRegEx.test(personalCode)) {
    const error = new Error("INVALID_PERSONAL_CODE");
    error.statusCode = 400;
    throw error;
  }

  if (accountNameExist) {
    const error = new Error("ACCOUNT_NAME_EXIST");
    error.statusCode = 409;
    throw error;
  }

  if (emailExist) {
    const error = new Error("EMAIL_EXIST");
    error.statusCode = 409;
    throw error;
  }
  if (phoneNumberExist) {
    const error = new Error("PHONE_NUMBER_EXIST");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return await adminUserDao.createAdminUser(
    accountName,
    hashedPassword,
    personalCode,
    name,
    email,
    phoneNumber
  );
};

module.exports = {
  adminUserSignUp,
};
