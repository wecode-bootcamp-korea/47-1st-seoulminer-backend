const { cartDao } = require("../models");

const cartLookUpByUserId = async (userId) => {
  return await cartDao.cartLookUpByUserId(userId);
};

module.exports = { cartLookUpByUserId };
