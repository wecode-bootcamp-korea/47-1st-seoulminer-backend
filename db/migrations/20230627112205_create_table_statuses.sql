-- migrate:up
CREATE TABLE statuses (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE statuses
