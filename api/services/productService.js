const { productDao } = require("../models");

const getProducts = async (category, sorting, limit, offset) => {
  const products = await productDao.getProducts(
    category,
    sorting,
    limit,
    offset
  );
  return { products };
};

module.exports = {
  getProducts,
};
