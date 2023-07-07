-- migrate:up
INSERT INTO seoulminer.statuses (id, name)
VALUES (1, '결제 전');

INSERT INTO seoulminer.statuses (id, name)
VALUES (2, '결제 후');

-- migrate:down

