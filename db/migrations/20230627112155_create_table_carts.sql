-- migrate:up
CREATE TABLE carts (
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	product_id INT NOT NULL,
	product_option_id INT NOT NULL,
	quantity INT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE carts
