const category = async (category) => {
  const categoryArr = [];
  categoryArr.push();
};

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

async function limit(limit = 10) {
  return await `LIMIT ${limit}`;
}

async function offset(offset = 0) {
  return await `OFFSET ${offset}`;
}

module.exports = {
  category,
  sorting,
  limit,
  offset,
};
