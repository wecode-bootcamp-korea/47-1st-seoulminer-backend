const { productDao } = require("../models");

const getProductByProductId = async (productId) => {
  const product = await productDao.getProductByProductId(productId);

  return product;
};

module.exports = {
  getProductByProductId,
};
