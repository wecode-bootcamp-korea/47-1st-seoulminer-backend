const { productDao } = require("../models");

const lookupAllProducts = async () => {
  const allProductsPage = await productDao.lookupAllProducts();
  return { allProductsPage };
};

const lookupProductByProductId = async (productId) => {
  const productPage = await productDao.lookupProductByProductId(productId);
  return { productPage };
};

module.exports = {
  lookupAllProducts,
  lookupProductByProductId,
};
