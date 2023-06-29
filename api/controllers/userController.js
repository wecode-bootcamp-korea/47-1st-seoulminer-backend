const { userService } = require("../services");

const signUp = async (req, res) => {
  try {
    const { email, password, name, phoneNumber } = req.body;

    if (!email || !password || !name || !phoneNumber) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;

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
