const { orderService } = require("../services");
const { v4 } = require("uuid");

const getOrderItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderNumber = req.params.orderNumber;

    if (!userId || !orderNumber) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const order = await orderService.getOrderItems(userId, orderNumber);
    return res.status(200).json({ data: order });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

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
module.exports = { getOrderItems, createUserOrderByCart };
