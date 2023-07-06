const { orderService } = require("../services");

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

const createUserOrderByItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, productOptionId, quantity } = req.body;
    const orderNumber = v4();

    const orderStatus = Object.freeze({
      beforePayment: 1,
      afterPayment: 2,
    });

    if (!productId || !productOptionId || !quantity) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    await orderService.createUserOrderByItem(userId, orderNumber, productId, productOptionId, quantity, orderStatus);

    res.status(201).json({ message: "CREATE_ORDER_SUCCESS" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getOrderItems, createUserOrderByItem };
