-- migrate:up
ALTER TABLE orders MODIFY order_number VARCHAR(100);

-- migrate:down

