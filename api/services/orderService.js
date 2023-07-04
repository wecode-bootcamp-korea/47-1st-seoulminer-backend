const { orderDao } = require("../models");

const createUserOrderByItem = async (userId, orderNumber, productId, productOptionId, quantity) => {
  return await orderDao.createOrderByItem(userId, orderNumber, productId, productOptionId, quantity);
};

const createUserOrderByCart = async (userId, orderNumber, totalPrice) => {
  return await orderDao.createOrderByCart(userId, orderNumber, totalPrice);
};

module.exports = { createUserOrderByItem, createUserOrderByCart };
