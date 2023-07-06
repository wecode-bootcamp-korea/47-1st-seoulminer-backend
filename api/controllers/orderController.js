const { orderService } = require("../services");
const { v4 } = require("uuid");

const createUserOrderByCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderNumber = v4();
    const { cartId, totalPrice } = req.body;

    const orderStatus = Object.freeze({
      beforePayment: 1,
      afterPayment: 2,
    });

    return await orderService.createUserOrderByCart(userId, orderNumber, cartId, totalPrice, orderStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createUserOrderByCart };
