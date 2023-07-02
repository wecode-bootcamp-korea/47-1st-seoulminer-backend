const { productService } = require("../services");

const getProducts = async (req, res) => {
  const { category, sorting, limit, offset } = req.query;
  const products = await productService.getProducts(
    category,
    sorting,
    limit,
    offset
  );
  res.status(200).json({ data: products });
};

module.exports = {
  getProducts,
};
