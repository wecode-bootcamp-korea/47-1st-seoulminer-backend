const jwt = require("jsonwebtoken");
const { userDao } = require("../models");

const loginRequired = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];

    if (!token) {
      const error = new Error("TOKEN_NOT_FOUND");
      error.statusCode = 401;

      throw error;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userDao.getUserById(decodedToken.id);

    req.user = user[0];
    next();
  } catch {
    return res.status(401).json({ message: "INVALID_TOKEN" });
  }
};

module.exports = { loginRequired };
