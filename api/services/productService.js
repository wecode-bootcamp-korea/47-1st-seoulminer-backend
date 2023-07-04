const { productDao } = require("../models");

const getProductList = async (categoryIds, sorting, parsedLimit, parsedOffset) => {
  try {
    const productList = await productDao.getProductList(categoryIds, sorting, parsedLimit, parsedOffset);
    if (productList.length > 0) {
      return productList;
    } else {
      throw error;
    }
  } catch {
    const error = new Error("NO_SUCH_CONDITION");
    error.statusCode = 404;
    throw error;
  }
};

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
  getProductList,
};
