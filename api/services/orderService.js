const { orderDao } = require("../models");

const getOrderItems = async (userId, orderNumber) => {
  return await orderDao.orderItems(userId, orderNumber)
}

module.exports = { getOrderItems };