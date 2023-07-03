// const category = async (category) => {
//   const categoryArr = [];
//   for (let i = 0; )
//   categoryArr.push();
// };

const sorting = async (sorting = `ORDER BY created_at ASC`) => {
  if (sorting === "priceDESC") {
    return await `ORDER BY products_price DESC`;
  } else if (sorting === "priceASC") {
    return await `ORDER BY products_price ASC`;
  } else if (sorting === "new") {
    return await `ORDER BY created_at DESC`;
  } else if (sorting === "old") {
    return await `ORDER BY created_at ASC`;
  }
};

const pagination = async (limit = 10, offset = 0) => {
  return await `LIMIT ${limit} OFFSET ${offset}`;
};

module.exports = {
  category,
  sorting,
  pagination,
};
