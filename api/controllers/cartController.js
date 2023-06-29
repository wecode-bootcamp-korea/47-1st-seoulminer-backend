const { cartService } = require("../services");

const cartLookUpByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartLookUpByUserId = await cartService.cartLookUpByUserId(userId);

    if (cartLookUpByUserId.length === 0) {
      return await res.status(200).json({ message: "INVALID_USER_CART" });
    }

    return await res.status(200).json({ data: cartLookUpByUserId });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({ message: error.meesage });
  }
};

module.exports = { cartLookUpByUserId };
