const { cartDao } = require('../models');

const checkInventory = async(productId, productOptionId, quantity) => {
  const inventory = await cartDao.checkInventory(productId, productOptionId);
  if (quantity > inventory) {
    const error = new Error("QUANTITY_EXCEEDS_INVENTORY")
    error.statusCode = 409;
    throw error;
  } else {
    return true
  }
}

const updateInventory = async(productId, productOptionId, quantity) => {
  try {
    checkInventory(productId, productOptionId, quantity)
    cartDao.updateInventory(productId, productOptionId, quantity);
  } catch {
    const error = new Error("FAILED_TO_UPDATE_INVENTORY")
    error.statusCode = 500;
    throw error;
  }
}

//from 장바구니 page
const updateProductQuantity = async(userId, productId, productOptionId, quantity) => {
  checkInventory(productId, productOptionId, quantity);
  try {
    await cartDao.updateProductQuantity(userId, productId, productOptionId, quantity)
  } catch {
    const error = new Error("FAILED_TO_UPDATE_PRODUCT")
    error.statusCode = 500;
    throw error;
  }
}

//from products page
const addProductToCart = async (userId, productId, productOptionId, quantity) => {
  const inventory = await cartDao.checkInventory(productId, productOptionId);
  if (quantity > inventory) {
    const error = new Error("QUANTITY_EXCEEDS_INVENTORY")
    error.statusCode = 409;
    throw error;
  }

  const currentQuantity = await cartDao.cartProductQuantity(userId, productId, productOptionId)    
  if (currentQuantity > 0) {
    console.log(`input: ${quantity} , in db: ${currentQuantity}`)
    await updateProductQuantity(userId, productId, productOptionId, quantity)
  }
  else {
    try {
      await cartDao.addProduct(userId, productId, productOptionId, newQuantity);
    } catch {
      const error = new Error("FAILED_TO_ADD_PRODUCT")
      error.statusCode = 500;
      throw error;
    }
  }
  updateInventory(productId, productOptionId, quantity);
}



module.exports = {
  addProductToCart,
  updateProductQuantity,
  updateInventory,
  checkInventory
}