const { cartDao } = require("../models");

const getCartList = async (userId) => {
  return await cartDao.getCartList(userId);
};

module.exports = { getCartList };
