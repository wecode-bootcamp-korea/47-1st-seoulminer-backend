const { appDataSource } = require("./dataSource");

const orderItems = async (userId, orderNumber) => {
  try {
    return await appDataSource.query(
      `SELECT orders.order_number as orderNumber, 
              order_items.product_id, 
              order_items.product_option_id, 
              order_items.quantity 
      FROM order_items
      JOIN orders on orders.id = order_id
      WHERE user_id = ? AND order_number = ?
      `,
      [userId, orderNumber]
    )
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  orderItems
};
