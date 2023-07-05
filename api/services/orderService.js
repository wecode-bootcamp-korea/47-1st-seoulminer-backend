const { orderDao } = require("../models");

const createUserOrderByCart = async (userId, orderNumber, totalPrice, orderStatus) => {
  const userPoint = await orderDao.getUserPointById(userId);

  if (userPoint.points < totalPrice) {
    const error = new Error("NOT_ENOUGH_MONEY");
    error.statusCode = 403;

    throw error;
  }
  return await orderDao.createOrderByCart(userId, orderNumber, totalPrice, orderStatus);
};

module.exports = { createUserOrderByCart };
