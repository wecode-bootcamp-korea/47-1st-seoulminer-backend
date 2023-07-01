const { cartService } = require("../services");
const jwt = require("jsonwebtoken");

const getCartList = async (req, res) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];

    if (!token) {
      const error = new Error("INVALID_TOKEN");
      error.statusCode = 401;

      throw error;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.id;

    const getCartList = await cartService.getCartList(userId);

    if (getCartList.length === 0) {
      return await res.status(200).json({ message: "INVALID_USER_CART" });
    }

    return await res.status(200).json({ data: getCartList });
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "INVALID_TOKEN" });
  }
};

module.exports = { getCartList };
