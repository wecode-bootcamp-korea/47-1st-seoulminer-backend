-- migrate:up
  ALTER TABLE `carts` ADD UNIQUE KEY (`user_id`, `product_id`, `product_option_id`);

-- migrate:down

