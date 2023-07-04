const { productController } = require("../controllers");
const appDataSource = require("./dataSource");

const createUserOrderByItem = async (userId, orderNumber, productId, productOptionId, quantity) => {
  //
  const createOrderItem = await appDataSource.query(
    `
    INSERT INTO carts (
      orderNumber,
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
    [orderNumber, productId, productOptionId, quantity]
  );
};
module.exports = { createUserOrderByItem };
