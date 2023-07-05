const { orderService } = require("../services");

const getOrderItems = async(req, res) => {
  try {
    const userId = req.user.id;
    const { orderNumber } = req.body;
    if (!userId || !orderNumber) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const order = await orderService.getOrderItems(userId, orderNumber);
    return res.status(200).json({ data: order });
  } catch {
    res.status(error.statusCode).json({ message: error.message });
  }
}

module.exports = { getOrderItems };