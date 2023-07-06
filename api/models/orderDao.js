const { appDataSource } = require("./dataSource");

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

const createOrderByCart = async (userId, orderNumber, totalPrice, orderStatus) => {
  const queryRunner = await appDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    const getCartByUserId = await queryRunner.query(
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

    const orderId = await createOrder(queryRunner, userId, orderNumber, totalPrice, orderStatus);

    for (const item of getCartByUserId) {
      await createOrderItem(queryRunner, orderId, item.product_id, item.product_option_id, item.quantity);
    }

    await updatePoint(queryRunner, totalPrice, userId);

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
    console.log("오류 발생:", error.message);
    console.log("스택 추적:", error.stack);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

module.exports = { getUserPointById, createOrderByCart };
