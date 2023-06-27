-- migrate:up
CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
	price DECIMAL NOT NULL,
	category_id INT NOT NULL,
	description TEXT NULL,
	thumbnail_image VARCHAR(1000) NULL,
	hover_image VARCHAR(1000) NULL,
	detail_information TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE products
