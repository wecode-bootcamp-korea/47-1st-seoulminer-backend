const { cartDao } = require("../models");

const cartProductDeleteByCartId = async (cartId) => {
  return await cartDao.cartProductDeleteByCartId(cartId);
};

module.exports = { cartProductDeleteByCartId };
