const { cartService } = require("../services");

const cartProductDeleteByCartId = async (req, res) => {
  try {
    const { cartId } = req.params;

    await cartService.cartProductDeleteByCartId(cartId);
    return await res.status(204).json({ message: "ITEM_DELETE_SUCCESS" });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({ message: error.meesage });
  }
};

module.exports = { cartProductDeleteByCartId };
