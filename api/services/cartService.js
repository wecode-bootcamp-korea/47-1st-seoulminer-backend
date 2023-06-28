const { cartDao } = require('../models');

//only when purchased - move to purchase api?
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

//only when purchased - move to purchase api?
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
  var currentQuantity = await cartDao.cartProductQuantity(userId, productId, productOptionId)    
  var newQuantity = currentQuantity + quantity;
  await checkInventory(productId, productOptionId, newQuantity);
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
  var currentQuantity = await cartDao.cartProductQuantity(userId, productId, productOptionId)    
  if (currentQuantity > 0) {
    await updateProductQuantity(userId, productId, productOptionId, quantity)
  }
  else {
    try {
      checkInventory(productId, productOptionId, quantity);
      await cartDao.addProduct(userId, productId, productOptionId, quantity);
    } catch {
      const error = new Error("FAILED_TO_ADD_PRODUCT")
      error.statusCode = 500;
      throw error;
    }
  }
}



module.exports = {
  addProductToCart,
  updateProductQuantity,
  updateInventory,
  checkInventory
}