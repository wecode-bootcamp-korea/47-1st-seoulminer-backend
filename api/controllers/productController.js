const { productService } = require("../services");

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
  getProductByProductId,
};
