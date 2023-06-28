-- migrate:up
ALTER TABLE `user_addresses` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(id);
ALTER TABLE `product_themes` ADD FOREIGN KEY (`theme_id`) REFERENCES `themes`(id);
ALTER TABLE `product_themes` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(id);
ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories`(id);
ALTER TABLE `product_options` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(id);
ALTER TABLE `carts` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(id);
ALTER TABLE `carts` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(id);
ALTER TABLE `carts` ADD FOREIGN KEY (`product_option_id`) REFERENCES `product_options`(id);
ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(id);
ALTER TABLE `orders` ADD FOREIGN KEY (`status_id`) REFERENCES `statuses`(id);
ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders`(id);
ALTER TABLE `order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(id);
ALTER TABLE `order_items` ADD FOREIGN KEY (`product_option_id`) REFERENCES `product_options`(id);

-- migrate:down

