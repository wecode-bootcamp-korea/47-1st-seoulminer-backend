const { appDataSource } = require("./dataSource");

const checkInventory = async (productId, productOptionId) => {
  try {
    const [product] = await appDataSource.query(
      `
      SELECT 
        product_id as productId,
        id as productOptionId,
        inventory 
      FROM product_options
      where id = ? and product_id = ?
      `,
      [productOptionId, productId]
    );
    return product;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const createCartItem = async (userId, productId, productOptionId, quantity) => {
  try {
    await appDataSource.query(
      `
      INSERT INTO carts (
        user_id,
        product_id,
        product_option_id,
        quantity
        ) VALUES ( ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?
      `,
      [userId, productId, productOptionId, quantity, quantity]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getCartItem = async (userId, productId, productOptionId) => {
  try {
    const [item] = await appDataSource.query(
      `
      SELECT 
        user_id as userId, 
        product_id as productId, 
        product_option_id as productOptionId, 
        quantity
      FROM carts 
      WHERE 
        user_id = ? and 
        product_id = ? and
        product_option_id = ?
      `,
      [userId, productId, productOptionId]
    );
    return item;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};const deleteCart = async (userId) => {
  try {
    await appDataSource.query(
      `
      DELETE from carts
        where user_id = ?
      `,
      [userId]
    )
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
}


module.exports = {
  createCartItem,
  getCartItem,
  checkInventory,
  deleteCart,
};
