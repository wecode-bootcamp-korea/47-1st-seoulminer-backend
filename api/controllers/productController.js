const { productService } = require("../services");

const getProductList = async (req, res) => {
  try {
    const { category = "all", sorting = "old", limit = 10, offset = 0 } = req.query;
    
    const categoryIds = Array.isArray(category) ? category : [category];

    const parsedLimit = parseInt(limit, 10);
    const parsedOffset = parseInt(offset, 10);

    const productList = await productService.getProductList(categoryIds, sorting, parsedLimit, parsedOffset);
    res.status(200).json({ data: productList });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

const getProductByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductByProductId(productId);
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = {
  getProductList,
  getProductByProductId,
};
