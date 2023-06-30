const { cartDao } = require('../models');

const createCartItem = async (userId, productId, productOptionId, quantity) => {
  try {
    const product = await cartDao.checkInventory(productId, productOptionId);
    if (product.inventory == 0) {
      const error = new Error("PRODUCT_OUT_OF_STOCK")
      error.statusCode = 400;
      throw error;
    }
    const storedCartItem = await cartDao.getCartItem(userId, productId, productOptionId);
    if (storedCartItem) {
      if (storedCartItem.quantity + quantity > product.inventory) {
        const error = new Error("QUANTITY_EXCEEDS_INVENTORY")
        error.statusCode = 409;
        throw error; 
      }
    }
    await cartDao.createCartItem(userId, productId, productOptionId, quantity);
  } catch {
    const error = new Error("FAILED_TO_ADD_PRODUCT")
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  createCartItem
}