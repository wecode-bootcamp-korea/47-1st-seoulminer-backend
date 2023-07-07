const { orderDao } = require("../models");

const getOrderItems = async (userId, orderNumber) => {
  try {
    return await orderDao.orderItems(userId, orderNumber);
  } catch {
    error = new Error("FAILED_TO_GET_ORDER_DETAILS");
    error.statusCode = 400;
    throw error;
  }
};

const getAllOrders = async (userId) => {
  try {
    return await orderDao.allOrders(userId)
  } catch {
    error = new Error('FAILED_TO_GET_ORDERS')
    error.statusCode = 400;
    throw error;
  }
}

const createUserOrderByCart = async (userId, orderNumber, totalPrice, orderStatus) => {
  const userPoint = await orderDao.getUserPointById(userId);

  if (userPoint.points < totalPrice) {
    const error = new Error("NOT_ENOUGH_MONEY");
    error.statusCode = 403;

    throw error;
  }

  return await orderDao.createOrderByCart(userId, orderNumber, totalPrice, orderStatus);
};

const createUserOrderByItem = async (userId, orderNumber, productId, productOptionId, quantity, orderStatus) => {
  const userPoint = await orderDao.getUserPointById(userId);
  const itemPrice = await orderDao.getProductPrice(productId);

  if (userPoint.points < itemPrice.price) {
    const error = new Error("NOT_ENOUGH_MONEY");
    error.statusCode = 403;

    throw error;
  }
  return await orderDao.createOrderByItem(userId, orderNumber, productId, productOptionId, quantity, orderStatus, itemPrice);
};

module.exports = { createUserOrderByCart, getAllOrders, getOrderItems, createUserOrderByItem };
