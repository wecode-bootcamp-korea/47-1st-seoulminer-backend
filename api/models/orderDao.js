const { appDataSource } = require("./dataSource");

const orderItems = async (userId, orderNumber) => {
  try {
    return await appDataSource.query(
      `SELECT 
        orders.order_number as orderNumber,
        orders.total_price as totalPrice,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'productId', product_id, 
          'quantity', quantity,
          'itemPrice', price,
          'orderPrice', quantity*price
          )
        ) as orderItems
      FROM order_items
      JOIN orders on orders.id = order_items.order_id
      JOIN products on products.id = product_id
      WHERE orders.user_id = ? AND orders.order_number = ?
      group by order_items.order_id
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
