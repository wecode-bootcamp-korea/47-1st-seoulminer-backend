const { appDataSource } = require("./dataSource");

const getAllProducts = async () => {
  // try {
  return await appDataSource.query(
    `SELECT
      id,
      name,
      price,
      category_id,
      description,
      thumbnail_image,
      hover_image,
      detail_information,
      created_at,
      updated_at
    From products
    LIMIT 3 OFFSET 0;
    `
    // ,[limit, offset]
  );
  // } catch {
  //   const error = new Error("dataSource Error");
  //   error.statusCode = 400;

  //   throw error;
  // }
};

module.exports = {
  getAllProducts,
};
