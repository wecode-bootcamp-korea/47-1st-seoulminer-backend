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
    const { totalPrice } = req.body;
    const orderNumber = v4();

    const orderStatus = Object.freeze({
      beforePayment: 1,
      afterPayment: 2,
    });

    if (!totalPrice) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    await orderService.createUserOrderByCart(userId, orderNumber, totalPrice, orderStatus);

    res.status(201).json({ message: "CREATE_ORDER_SUCCESS" });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { getOrderItems, createUserOrderByCart };
