const { productDao } = require("../models");

const getProductList = async (
  categoryIds,
  sorting,
  parsedLimit,
  parsedOffset
) => {
  const productList = await productDao.getProductList(
    categoryIds,
    sorting,
    parsedLimit,
    parsedOffset
  );
  if (!productList[0]) {
    const error = new Error("NO_SUCH_CONDITION");
    error.statusCode = 404;
    throw error;
  }
  return productList;
};

module.exports = {
  getProductList,
};
