const { appDataSource } = require("./dataSource");

const createOrder = async (userId, orderNumber, totalPrice) => {
  await appDataSource.query(
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
    [userId, orderNumber, totalPrice]
  );

  const getOrderId = await appDataSource.query(
    `
    SELECT id
    FROM orders
    WHERE order_number = ?
  `,
    [orderNumber]
  );

  const orderId = getOrderId[0].id;

  return orderId;
};

const createOrderItem = async (orderId, productId, productOptionId, quantity) => {
  await appDataSource.query(
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

const createOrderByItem = async (userId, orderNumber, productId, productOptionId, quantity) => {
  const [getProductInfoByProductId] = await appDataSource.query(
    `
      SELECT price
      FROM products
      WHERE id = ?
  `,
    [productId]
  );

  const itemPrice = getProductInfoByProductId.price;
  const orderId = await createOrder(userId, orderNumber, itemPrice);

  await createOrderItem(orderId, productId, productOptionId, quantity);
};

const createOrderByCart = async (userId, orderNumber, totalPrice) => {
  const getCartByUserId = await appDataSource.query(
    `
    SELECT 
      product_id,
      product_option_id,
      quantity
    FROM carts
    WHERE user_id = ?
  `,
    [userId]
  );

  const orderId = await createOrder(userId, orderNumber, totalPrice);

  for (const item of getCartByUserId) {
    await createOrderItem(orderId, item.product_id, item.product_option_id, item.quantity);
  }
};

module.exports = { createOrderByItem, createOrderByCart };
