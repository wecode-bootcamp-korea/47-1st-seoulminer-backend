const { appDataSource } = require("./dataSource");

const lookupAllProducts = async () => {
  try {
    return await appDataSource.query(
      `SELECT
      id,
      name,
      price,
      category_id,
      description,
      thumbnail_image,
      hover_image,
      detail_information
    From products`
    );
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

const lookupProductByProductId = async (productId) => {
  try {
    return await appDataSource.query(
      `SELECT
      id,
      name,
      price,
      category_id,
      description,
      thumbnail_image,
      hover_image,
      detail_information
    From products 
    WHERE id = ?
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
  lookupAllProducts,
  lookupProductByProductId,
};
