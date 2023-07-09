-- migrate:up
CREATE TABLE admin_users (
  id INT NOT NULL AUTO_INCREMENT,
  account_name varchar(200) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  personal_code INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  phone_number VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE admin_users
