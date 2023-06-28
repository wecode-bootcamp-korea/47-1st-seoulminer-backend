const { cartDao } = require('../models');

const addProductToCart = async (userId, productId, productOptionId, quantity) => {
  const inventory = await cartDao.checkInventory(productId, productOptionId);
  console.log(inventory)
  console.log(quantity)
  if (quantity > inventory) {
    const error = new Error("QUANTITY_EXCEEDS_INVENTORY")
    error.statusCode = 409;
    throw error;
  }

  const current_quantity = await cartDao.cartProductQuantity(userId, productId, productOptionId)    
  console.log(current_quantity)
  var new_quantity = 0;
  if (current_quantity > 0) {
    console.log(`input: ${quantity} , in db: ${current_quantity}`)
    await cartDao.deleteCartItem(userId, productId, productOptionId)
    new_quantity = current_quantity + quantity;
    console.log(`update: ${new_quantity}`)
  }
  else {
    new_quantity = quantity;
  }
  try {
    console.log(userId, productId, productOptionId, quantity);
    await cartDao.addProduct(userId, productId, productOptionId, new_quantity);
    console.log("hi")
  } catch {
    const error = new Error("FAILED_TO_ADD_PRODUCT")
    error.statusCode = 500;
    throw error;
  }

  try {
    const updatedInventory = inventory - quantity
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