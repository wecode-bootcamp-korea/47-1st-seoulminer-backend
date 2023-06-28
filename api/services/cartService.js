const { cartDao } = require('../models');

const addProductToCart = async (userId, productId, productOptionId, quantity) => {
  const inventory = await cartDao.checkInventory(productId, productOptionId);
  console.log(inventory)
  if (quantity > inventory) {
    const error = new Error("QUANTITY_EXCEEDS_INVENTORY")
    error.statusCode = 409;
    throw error;
  }

  console.log(userId, productId, productOptionId, quantity);
  try {
    await cartDao.addProduct(userId, productId, productOptionId, quantity);
  } catch {
    const error = new Error("FAILED_TO_ADD_PRODUCT")
    error.statusCode = 500;
    throw error;
  }

  const updatedInventory = inventory - quantity

  try {
    console.log(productId, productOptionId, updatedInventory);
    await cartDao.updateInventory(productId, productOptionId, updatedInventory);

  } catch {
    const error = new Error("FAILED_TO_UPDATE_INVENTORY")
    error.statusCode = 500;
    throw error;
  }


}

module.exports = {
  addProductToCart
}