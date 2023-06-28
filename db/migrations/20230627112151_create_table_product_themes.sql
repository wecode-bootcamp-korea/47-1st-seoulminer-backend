-- migrate:up
CREATE TABLE product_themes (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  theme_id INT NOT NULL,
  PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE product_themes
