const appDataSource = require("./dataSource");

const getProductByProductId = async (productId) => {
  try {
    return await appDataSource.query(
      `
    SELECT
      products.id AS product_id,
      products.name AS product_name,
      products.price AS product_price,
      products.category_id AS product_category_id,
      products.description AS product_description,
      products.thumbnail_image AS product_thumbnail_image,
      products.hover_image AS product_hover_image,
      products.detail_information AS product_detail_information,
      products.created_at AS product_created_at,
      products.updated_at AS product_updated_at,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'option_id', product_options.id,
        'option_name', product_options.name,
        'option_description', product_options.description,
        'option_inventory', product_options.inventory
       )
      ) AS product_options
      FROM products
      INNER JOIN product_options ON products.id = product_options.product_id
      WHERE products.id = ?
      GROUP BY products.id
    `,
      [productId]
    );
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};
module.exports = {
  getProductByProductId,
};
