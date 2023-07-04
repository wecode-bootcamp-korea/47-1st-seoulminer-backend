const { orderService } = require("../services");
const { v4 } = require("uuid");

const createUserOrderByItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, productOptionId, quantity } = req.body;
    // const orderNumber = v4();
    const orderNumber = 1;
    console.log(userId);
    console.log(req.body);
    console.log(orderNumber);
    await orderService.createUserOrderByItem(userId, orderNumber, productId, productOptionId, quantity);
    res.status(201).json({ message: "CREATE_ORDER_SUCCESS" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUserOrderByItem };
