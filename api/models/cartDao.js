const { appDataSource } = require("./dataSource");

const getCartList = async (userId) => {
  return await appDataSource.query(
    `
    SELECT 
      carts.id AS cartId,
      products.name AS productName,
      product_options.name AS productOptionName,
      carts.quantity AS quantity,
      products.price AS price
    FROM carts
    JOIN products ON carts.product_id = products.id
    JOIN product_options ON carts.product_option_id = product_options.id
    WHERE carts.user_id = ?;
  `,
    [userId]
  );
};

module.exports = { getCartList };
