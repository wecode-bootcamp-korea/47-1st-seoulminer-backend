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
  if (sorting === "priceDESC") {
    return `ORDER BY price DESC`;
  } else if (sorting === "priceASC") {
    return `ORDER BY price ASC`;
  } else if (sorting === "new") {
    return `ORDER BY created_at DESC`;
  } else {
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
