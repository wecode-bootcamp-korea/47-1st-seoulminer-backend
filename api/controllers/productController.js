const { productService } = require("../services");

const lookupAllProducts = async (req, res) => {
  const allProductsPage = await productService.lookupAllProducts();
  res.status(200).json({ data: allProductsPage });
};

const lookupProductByProductId = async (req, res) => {
  const productId = req.params.productId;
  const productPage = await productService.lookupProductByProductId(productId);
  res.status(200).json({ data: productPage });
};

module.exports = {
  lookupAllProducts,
  lookupProductByProductId,
};
