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

const createUserOrderByCart = async (userId, orderNumber, cartId, totalPrice, orderStatus) => {
  const userPoint = await orderDao.getUserPoint(userId);

  if (userPoint < totalPrice) {
    const error = new Error("NOT_ENOUGH_MONEY");
    error.statusCode = 403;

    throw error;
  }

  return await orderDao.createUserOrderByCart(userId, orderNumber, cartId, totalPrice, orderStatus);
};

module.exports = { createUserOrderByCart, getOrderItems };
