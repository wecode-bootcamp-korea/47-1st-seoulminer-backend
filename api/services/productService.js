const { productDao } = require("../models");

const getProductByProductId = async (productId) => {
  const product = await productDao.getProductByProductId(productId);

  if (!product) {
    const error = new Error("NO_SUCH_PRODUCT");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

module.exports = {
  getProductByProductId,
};
