const { appDataSource } = require("./dataSource");
const queryBuilder = require("./queryBuilder");

const getProducts = async (category, sorting, limit, offset) => {
  // try {
  return await appDataSource.query(
    `SELECT
      products.id AS product_id,
      products.name AS product_name,
      products.price AS product_price,
      products.category_id AS product_category_id,
      products.thumbnail_image AS product_thumbnail_image,
      products.hover_image AS product_hover_image,
      products.created_at AS product_created_at,
      products.updated_at AS product_updated_at
    FROM products
    `
  );
  // } catch {
  //   const error = new Error("dataSource Error");
  //   error.statusCode = 400;

  //   throw error;
  // }
};

module.exports = {
  getProducts,
};
