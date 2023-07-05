-- migrate:up
ALTER TABLE users ADD points DECIMAL(10,2) NOT NULL;

-- migrate:down
ALTER TABLE users DROP COLUMN points;
