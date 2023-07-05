const { cartDao } = require("../models");

const createCartItem = async (userId, productId, productOptionId, quantity) => {
  try {
    const product = await cartDao.checkInventory(productId, productOptionId);

    if (product.inventory === 0) {
      const error = new Error("PRODUCT_OUT_OF_STOCK");
      error.statusCode = 400;
      throw error;
    }

    const storedCartItem = await cartDao.getCartItem(userId, productId, productOptionId);

    if (storedCartItem) {
      if (storedCartItem.quantity + quantity > product.inventory) {
        const error = new Error("QUANTITY_EXCEEDS_INVENTORY");
        error.statusCode = 409;
        throw error;
      }

      if (storedCartItem.quantity + quantity < 0) {
        const error = new Error("QUANTITY_CANNOT_BE_0");
        error.statusCode = 409;
        throw error;
      }
    }

    await cartDao.createCartItem(userId, productId, productOptionId, quantity);
  } catch (error) {
    throw error;
  }
};

const cartProductDeleteByCartId = async (cartId) => {
  return await cartDao.cartProductDeleteByCartId(cartId);
};

const getCartList = async (userId) => {
  return await cartDao.getCartList(userId);
};

const updateCartItem = async (userId, productId, productOptionId, quantity) => {
  try {
    const product = await cartDao.checkInventory(productId, productOptionId);

    if (product.inventory === 0) {
      const error = new Error("PRODUCT_OUT_OF_STOCK");
      error.statusCode = 400;
      throw error;
    }

    const storedCartItem = await cartDao.getCartItem(userId, productId, productOptionId);

    if (storedCartItem.quantity + quantity > product.inventory) {
      const error = new Error("QUANTITY_EXCEEDS_INVENTORY");
      error.statusCode = 409;
      throw error;
    }

    if (storedCartItem.quantity + quantity < 0) {
      const error = new Error("QUANTITY_CANNOT_BE_0");
      error.statusCode = 409;
      throw error;
    }

    await cartDao.createCartItem(userId, productId, productOptionId, quantity);
  } catch (error) {
    throw error;
  }
};

const deleteAllCart = async (userId) => {
  return await cartDao.deleteAllCart(userId)
};

module.exports = {
  createCartItem,
  deleteAllCart,
  cartProductDeleteByCartId,
  getCartList,
  updateCartItem
};
