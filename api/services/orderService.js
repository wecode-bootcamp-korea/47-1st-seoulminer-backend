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

module.exports = { getOrderItems, createUserOrderByItem };
