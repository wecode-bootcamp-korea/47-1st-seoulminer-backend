const { appDataSource } = require("./dataSource");

const cartProductDeleteByCartId = async (cartId) => {
  return await appDataSource.query(
    `
    DELETE
    FROM carts
    WHERE id = ?;
  `,
    [cartId]
  );
};

module.exports = { cartProductDeleteByCartId };
