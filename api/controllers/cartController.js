const { cartService } = require("../services");

const cartLookUpByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartLookUpByUserId = await cartService.cartLookUpByUserId(userId);
    return res.status(200).json({ data: cartLookUpByUserId });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({ message: error.meesage });
  }
};

module.exports = { cartLookUpByUserId };
