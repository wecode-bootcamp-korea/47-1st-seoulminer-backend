const { productDao } = require("../models");

const getAllProducts = async () => {
  const products = await productDao.getAllProducts();
  return { products };
};

module.exports = {
  getAllProducts,
};
