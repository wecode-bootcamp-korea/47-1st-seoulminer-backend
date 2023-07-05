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

const getAllOrders = async (userId) => {
  try {
    return await orderDao.allOrders(userId)
  } catch {
    error = new Error('FAILED_TO_GET_ORDERS')
    error.statusCode = 400;
    throw error;
  }
}

module.exports = { getOrderItems, getAllOrders };