const { orderDao } = require("../models");

const createUserOrderByCart = async (userId, orderNumber, cartId, totalPrice, orderStatus) => {
  const userPoint = await orderDao.getUserPoint(userId);

  if (userPoint < totalPrice) {
    const error = new Error("NOT_ENOUGH_MONEY");
    error.statusCode = 403;

    throw error;
  }

  return await orderDao.createUserOrderByCart(userId, orderNumber, cartId, totalPrice, orderStatus);
};

module.exports = { createUserOrderByCart };
