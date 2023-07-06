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
    );
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;
    throw error;
  }
};

const getUserPointById = async (userId) => {
  const [userPoint] = await appDataSource.query(
    `
    SELECT points
    FROM users
    WHERE id = ?
  `,
    [userId]
  );
  return userPoint;
};

const getProductPrice = async (productId) => {
  const [getProductInfoByProductId] = await appDataSource.query(
    `
      SELECT price
      FROM products
      WHERE id = ?
  `,
    [productId]
  );

  return getProductInfoByProductId.price;
};

const createOrder = async (queryRunner, userId, orderNumber, totalPrice, orderStatus) => {
  await queryRunner.query(
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
      ?
    )
  `,
    [userId, orderNumber, totalPrice, orderStatus.beforePayment]
  );

  const getOrderId = await queryRunner.query(
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

const createOrderItem = async (queryRunner, orderId, productId, productOptionId, quantity) => {
  await queryRunner.query(
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

const updatePoint = async (queryRunner, totalPrice, userId) => {
  await queryRunner.query(
    `
  UPDATE users
  SET points = points - ?
  WHERE id = ?
`,
    [totalPrice, userId]
  );
};

const createOrderByItem = async (userId, orderNumber, productId, productOptionId, quantity, orderStatus, itemPrice) => {
  const queryRunner = await appDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    const orderId = await createOrder(queryRunner, userId, orderNumber, itemPrice, orderStatus);

    await createOrderItem(queryRunner, orderId, productId, productOptionId, quantity);

    await updatePoint(queryRunner, itemPrice, userId);

    await queryRunner.query(
      `
      UPDATE orders
      SET status_id = ?
      WHERE order_number = ?
    `,
      [orderStatus.afterPayment, orderNumber]
    );

    await queryRunner.query(
      `
      DELETE
      FROM carts
      WHERE user_id = ?
    `,
      [userId]
    );
  } catch (error) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

module.exports = { orderItems, getUserPointById, getProductPrice, createOrderByItem };
