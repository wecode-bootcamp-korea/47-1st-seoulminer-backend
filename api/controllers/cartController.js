const { cartService } = require('../services')

const addProductToCart = async (req, res) => {
  const { userId, productId, productOptionId, quantity } = req.body;
  if (!userId || !productId || !productOptionId || !quantity) {
    const error = new Error('KEY_ERROR')
    error.statusCode = 400;
    throw error;
  }

  try {
    await cartService.addProductToCart(userId, productId, productOptionId, quantity);
    res.status(200).json({message: "Product Added to Cart"});
  } catch (error) {
    res.status(error).json({message: "error"});
  }
}

const updateProductQuantity = async (req, res) => {
  const { userId, productId, productOptionId, quantity } = req.body;
  if (!userId || !productId || !productOptionId || !quantity) {
    const error = new Error('KEY_ERROR')
    error.statusCode = 400;
    throw error;
  }

  try {
    await cartService.updateProductQuantity(userId, productId, productOptionId, quantity);
    res.status(200).json({message: "Product Quantity Updated"});
  } catch (error) {
    res.status(error).json({message: "error"});
  }
}

module.exports = { 
  addProductToCart,
  updateProductQuantity
}