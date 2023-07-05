const { orderDao } = require("../models");

const getOrderItems = async (userId, orderNumber) => {
  try {
    return await orderDao.orderItems(userId, orderNumber)
  } catch {
    error = new Error('FAILED_TO_GET_ORDER_DETAILS')
    error.statusCode = 400;
    throw error;
  }
}

module.exports = { getOrderItems };