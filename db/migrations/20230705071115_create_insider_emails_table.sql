-- migrate:up
CREATE TABLE insider_emails (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(200) NOT NULL UNIQUE,
  PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE insider_emails
