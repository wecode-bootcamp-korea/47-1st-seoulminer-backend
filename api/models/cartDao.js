const { appDataSource } = require("./dataSource");

const cartLookUpByUserId = async (userId) => {
  const cartLookUpByUserId = await appDataSource.query(`
    SELECT 
    products.name productName,
    product_options.name productOptionName,
    carts.quantity quantity,
    products.price*quantity price
    FROM carts
    JOIN products ON carts.product_id = products.id
    JOIN product_options ON carts.product_id = product_options.product_id
    WHERE carts.user_id = ${userId};
  `);
  return cartLookUpByUserId;
};

module.exports = { cartLookUpByUserId };
