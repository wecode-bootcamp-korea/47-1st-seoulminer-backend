const orderDao = require("../models");

const createUserOrderByItem = async (userId, orderNumber, productId, productOptionId, quantity) => {
  return await orderDao.createUserOrderByItem(userId, orderNumber, productId, productOptionId, quantity);
};

module.exports = { createUserOrderByItem };
