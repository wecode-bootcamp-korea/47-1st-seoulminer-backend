const { orderDao } = require("../models");

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

module.exports = { createUserOrderByItem };
