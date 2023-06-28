-- migrate:up
CREATE TABLE user_addresses (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  nickname VARCHAR(50) NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE user_addresses
