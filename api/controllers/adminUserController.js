const { adminUserService } = require("../services");

const adminUserSignUp = async (req, res) => {
  try {
    const { accountName, password, personalCode, name, email, phoneNumber } =
      req.body;

    if (
      !accountName ||
      !password ||
      !personalCode ||
      !name ||
      !email ||
      !phoneNumber
    ) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    await adminUserService.adminUserSignUp(
      accountName,
      password,
      personalCode,
      name,
      email,
      phoneNumber
    );
    return res.status(201).json({ message: "CREATE_ADMIN_USER_SUCCESS!" });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { adminUserSignUp };
