// // 필터링
// SELECT
//   id,
//   name,
//   price,
//   category_id,
//   description,
//   thumbnail_image,
//   hover_image,
//   detail_information,
//   created_at,
//   updated_at
// FROM products
// WHERE category_id = 1 AND price >= 100

// // 소팅
// // 최신생성순 created_at ascending
// SELECT
//   id,
//   name,
//   price,
//   category_id,
//   description,
//   thumbnail_image,
//   hover_image,
//   detail_information,
//   created_at,
//   updated_at
// FROM products
// ORDER BY created_at DESC;
// // 오래된생성순 created_at descending
// SELECT
//   id,
//   name,
//   price,
//   category_id,
//   description,
//   thumbnail_image,
//   hover_image,
//   detail_information,
//   created_at,
//   updated_at
// FROM products
// ORDER BY created_at ASC;
// // 가격비싼순 내림차순 price descending
// SELECT
// id,
// name,
// price,
// category_id,
// description,
// thumbnail_image,
// hover_image,
// detail_information,
// created_at,
// updated_at
// FROM products
// ORDER BY price DESC;
// // 가격싼순 오름차순 price ascending
// SELECT
//   id,
//   name,
//   price,
//   category_id,
//   description,
//   thumbnail_image,
//   hover_image,
//   detail_information,
//   created_at,
//   updated_at
// FROM products
// ORDER BY price ASC;
// // 페이지네이션
// SELECT
//   id,
//   name,
//   price,
//   category_id,
//   description,
//   thumbnail_image,
//   hover_image,
//   detail_information,
//   created_at,
//   updated_at
// FROM products
// LIMIT 10 OFFSET 10;

// ORDER BY
// CASE ?
//   WHEN 'price_asc' THEN price
//   WHEN 'price_desc' THEN pirce * -1
//   WHEN 'created_at_asc' THEN created_at
//   WHEN 'created_at_desc' THEN created_at * -1
// END
