const { productService } = require("../services");

const getProductByProductId = async (req, res) => {
  const productId = req.params.productId;

  const product = await productService.getProductByProductId(productId);
  if (!product[0]) {
    res.status(200).json({ message: "NO_SUCH_PRODUCT" });
  } else res.status(200).json({ data: product });
};

module.exports = {
  getProductByProductId,
};
