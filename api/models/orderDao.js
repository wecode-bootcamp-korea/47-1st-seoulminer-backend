const { appDataSource } = require("./dataSource");

const createOrderByItem = async (userId, orderNumber, productId, productOptionId, quantity) => {
  const getProductInfoByProductId = await appDataSource.query(
    `
      SELECT
        p.name name,
        po.name optionName,
        p.price price
      FROM products p
      JOIN product_options po ON po.id = ?
      WHERE p.id = ?
  `,
    [productOptionId, productId]
  );

  const orderItem = getProductInfoByProductId[0];

  const createOrder = await appDataSource.query(
    `
    INSERT INTO orders(
      user_id,
      order_number,
      total_price,
      status_id
    ) VALUES (
      ?,
      ?,
      ?,
      1
    )
  `,
    [userId, orderNumber, orderItem.price]
  );

  const getOrderId = await appDataSource.query(
    `
    SELECT id
    FROM orders
    WHERE user_id = ?
  `,
    [userId]
  );

  const orderId = getOrderId[0].id;

  const createOrderItem = await appDataSource.query(
    `
    INSERT INTO order_items(
      order_id,
      product_id,
      product_option_id,
      quantity
    ) VALUES (
      ?,
      ?,
      ?,
      ?
    )
  `,
    [orderId, productId, productOptionId, quantity]
  );
};

module.exports = { createOrderByItem };
