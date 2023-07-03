const { appDataSource } = require("./dataSource");
const queryBuilder = require("./queryBuilder");

const getProductList = async (
  categoryIds,
  sorting,
  parsedLimit,
  parsedOffset
) => {
  try {
    const filterQuery = queryBuilder.filterBuilder(categoryIds);
    const orderQuery = queryBuilder.sortingBuilder(sorting);
    const paginationQuery = queryBuilder.paginationBuilder(
      parsedLimit,
      parsedOffset
    );
    const productList = await appDataSource.query(
      `
      SELECT
        products.id AS productId,
        products.name AS productName,
        products.price AS productPrice,
        products.category_id AS productCategoryId,
        products.thumbnail_image AS productThumbnailImage,
        products.hover_image AS productHoverImage,
        products.created_at AS productCreatedAt,
        products.updated_at AS productUpdatedAt
      FROM products
      ${filterQuery}
      ${orderQuery}
      ${paginationQuery}
      `
    );
    return productList;
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getProductList,
};
