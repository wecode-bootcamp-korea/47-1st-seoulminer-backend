const { orderService } = require("../services");
const { v4 } = require("uuid");

const createUserOrderByItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, productOptionId, quantity } = req.body;

    const orderNumber = v4();
    await orderService.createUserOrder(userId, orderNumber, productId, productOptionId, quantity);
    return res.status(201).json({ message: "CREATE_ORDER_SUCCESS" });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { createUserOrderByItem };
