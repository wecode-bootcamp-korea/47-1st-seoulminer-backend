-- migrate:up
CREATE TABLE product_options (
	id INT NOT NULL AUTO_INCREMENT,
	product_id INT NOT NULL,
	name VARCHAR(1000) NULL,
	description VARCHAR(1000) NULL,
	inventory INT NOT NULL,
	PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE product_options
