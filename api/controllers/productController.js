const { productService } = require("../services");

const getAllProducts = async (req, res) => {
  // const { limit, offset } = req.query;
  const products = await productService.getAllProducts();
  res.status(200).json({ data: products });
};

module.exports = {
  getAllProducts,
};
