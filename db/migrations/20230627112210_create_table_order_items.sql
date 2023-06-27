-- migrate:up
CREATE TABLE order_items (
	id INT NOT NULL AUTO_INCREMENT,
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	product_option_id INT NOT NULL,
	quantity INT NOT NULL,
	PRIMARY KEY (id)
)
-- migrate:down
DROP TABLE order_items
