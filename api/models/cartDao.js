const dataSource = require('./dataSource');

const cartProductQuantity = async(userId, productId, productOptionId) => {
  try {
    const [result] = await dataSource.query(
      `
      SELECT SUM(quantity) as sum FROM carts 
      where user_id = ? and product_id = ? and product_option_id = ?
      `,
      [userId, productId, productOptionId]
    )
    return parseInt(result.sum, 10)
  } catch (err) {
    const error = new Error('isincart error');
    error.statusCode = 400;
    throw error;
  }

}

const deleteCartItem = async(userId, productId, productOptionId) => {
  try {
    await dataSource.query(
      `
      DELETE FROM carts
      where user_id = ? and product_id = ? and product_option_id = ?
      `,
      [userId, productId, productOptionId]
    )
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
}


const checkInventory = async(productId, productOptionId) => {
  try {
    const [product] = await dataSource.query(
      `
      SELECT * FROM product_options
      where id = ? and product_id = ?
      `,
      [productOptionId, productId]
    )
    return product.inventory;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
}

const updateInventory = async(productId, productOptionId, updatedInventory) => {
  try {
    await dataSource.query(
      `
      UPDATE product_options
      SET inventory = ?
      where id = ? and product_id = ?
      `,
      [updatedInventory, productOptionId, productId]
    )

  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
}

const addProduct = async(userId, productId, productOptionId, quantity) => {
  try {
    await dataSource.query(
      `
      INSERT INTO carts (
        user_id,
        product_id,
        product_option_id,
        quantity
        ) VALUES ( ?, ?, ?, ?)
      `,
      [userId, productId, productOptionId, quantity]
    )
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  addProduct,
  checkInventory,
  updateInventory,
  cartProductQuantity,
  deleteCartItem
}