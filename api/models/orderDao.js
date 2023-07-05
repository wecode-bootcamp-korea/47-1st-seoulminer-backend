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
    // userId로 장바구니 가져오기
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
    // 주문서 생성 (orderStatus : beforePayment) (orders 테이블)
    const orderId = await createOrder(queryRunner, userId, orderNumber, totalPrice, orderStatus);

    // 주문 품목 생성 (order_items 테이블)
    for (const item of getCartByUserId) {
      await createOrderItem(queryRunner, orderId, item.product_id, item.product_option_id, item.quantity);
    }

    // 포인트 차감 기능
    await updatePoint(queryRunner, totalPrice, userId);

    // 주문서 상태 변경 (orderStatus : afterPayment)
    await queryRunner.query(
      `
      UPDATE orders
      SET status_id = ?
      WHERE order_number = ?
    `,
      [orderStatus.afterPayment, orderNumber]
    );
    // 장바구니 품목 삭제
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
  }
};

module.exports = { getUserPointById, createOrderByCart };
