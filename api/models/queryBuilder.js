const filterBuilder = (categoryIds) => {
  let filterQuery = "";
  if (categoryIds[0] === "all") {
    filterQuery = "";
  } else {
    filterQuery = `WHERE products.category_id IN (${categoryIds.join(",")})`;
  }
  return filterQuery;
};

const sortingBuilder = (sorting) => {
  switch (sorting) {
    case "priceDESC":
      return `ORDER BY price DESC`;
    case "priceASC":
      return `ORDER BY price ASC`;
    case "new":
      return `ORDER BY created_at DESC`;
    case "old":
      return `ORDER BY created_at ASC`;
  }
};

const paginationBuilder = (parsedLimit, parsedOffset) => {
  return `LIMIT ${parsedLimit} OFFSET ${parsedOffset}`;
};

module.exports = {
  filterBuilder,
  sortingBuilder,
  paginationBuilder,
};
