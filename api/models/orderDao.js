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

// 유저 포인트 조회
const getUserPoint = async (userId) => {
  const [getUserPoint] = await appDataSource.query(
    `
    SELECT
      points
    FROM users
    WHERE id = ?
  `,
    [userId]
  );

  const userPoint = getUserPoint;
  return userPoint;
};
const createUserOrderByCart = async (userId, orderNumber, cartId, totalPrice, orderStatus) => {
  const queryRunner = await appDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    // 주문서 생성 (before payment)
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
    console.log("주문서 생성");
    // 주문서 생성 때 사용된 orderNumber로 orderId 가져오기
    const getOrderId = await queryRunner.query(
      `
      SELECT id
      FROM orders
      WHERE order_number = ?
    `,
      [orderNumber]
    );
    const orderId = getOrderId[0].id;
    // cartid로 productid, productOptionId, quantity 가져오기
    // 근데 cartId 값이 여러개일 시 getCart 후 주문 품목 생성을 for문으로 묶어서 한개씩 생성 ??

    console.log(cartId);
    // 주문 품목 생성
    for (const cartItem in cartId) {
      console.log(cartItem);
      const getCart = await queryRunner.query(
        `
        SELECT 
          product_id,
          product_option_id,
          quantity
        FROM carts
        WHERE id = ?
      `,
        [cartId]
      );

      const { product_id, product_option_id, quantity } = getCart[cartItem];

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
        [orderId, product_id, product_option_id, quantity]
      );
    }
    console.log("주문 품목 생성");

    // 포인트 차감
    await queryRunner.query(
      `
      UPDATE users
      SET points = points - ?
      WHERE id = ?
    `,
      [totalPrice, userId]
    );
    console.log("포인트 차감");
    // 주문서 변경 (after payment)
    await queryRunner.query(
      `
      UPDATE orders
      SET status_id = ?
      WHERE order_number = ?
    `,
      [orderStatus.afterPayment, orderNumber]
    );
    console.log("주문서 변경");
    //장바구니 삭제
    await queryRunner.query(
      `
      DELETE
      FROM carts
      WHERE user_id = ?
    `,
      [userId]
    );
    console.log("장바구니 삭제");
  } catch (error) {
    console.log("error");
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

module.exports = { orderItems, getUserPoint, createUserOrderByCart };
