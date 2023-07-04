const { orderService } = require("../services");
const { v4 } = require("uuid");

const createUserOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, productOptionId, quantity, totalPrice } = req.body;
    const orderNumber = v4();

    if ((!productId || !productOptionId || !quantity) && !totalPrice) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    if (productId && productOptionId && quantity) {
      await orderService.createUserOrderByItem(userId, orderNumber, productId, productOptionId, quantity);
    } else if (totalPrice) {
      await orderService.createUserOrderByCart(userId, orderNumber, totalPrice);
    }

    res.status(201).json({ message: "CREATE_ORDER_SUCCESS" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUserOrder };
