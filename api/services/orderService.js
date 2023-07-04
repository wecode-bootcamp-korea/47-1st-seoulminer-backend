const { orderDao } = require("../models");

const createUserOrderByItem = async (userId, orderNumber, productId, productOptionId, quantity) => {
  console.log(orderNumber);
  return await orderDao.createOrderByItem(userId, orderNumber, productId, productOptionId, quantity);
};

module.exports = { createUserOrderByItem };
