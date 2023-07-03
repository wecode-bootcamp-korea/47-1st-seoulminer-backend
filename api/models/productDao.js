const appDataSource = require("./dataSource");

const getProductByProductId = async (productId) => {
  try {
    return await appDataSource.query(
      `
    SELECT
      products.id AS productId,
      products.name AS productName,
      products.price AS productPrice,
      products.category_id AS productCategoryId,
      products.description AS productDescription,
      products.thumbnail_image AS productThumbnailImage,
      products.hover_image AS productHoverImage,
      products.detail_information AS productDetailInformation,
      products.created_at AS productCreatedAt,
      products.updated_at AS productUpdatedAt,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'optionId', product_options.id,
        'optionName', product_options.name,
        'optionDescription', product_options.description,
        'optionInventory', product_options.inventory
       )
      ) AS productOptions
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
