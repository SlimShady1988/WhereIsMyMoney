INSERT INTO roles (id, name) values (1, 'ROLE_USER');
INSERT INTO roles (id, name) values (2, 'ROLE_ADMIN');
INSERT INTO roles (id, name) values (3, 'ROLE_SUPERADMIN');

INSERT INTO users (username, email, password)
values ('user', 'user', '$2a$12$ZfSvxRkaZxGS2P19EGXrveCLPayZYz/A7ZZpOl3gyXRu8J4nkCtma');
INSERT INTO users (username, email,password)
values ('admin', 'admin', '$2a$12$G6goV3EbL.0s1q0PrubOa./BCRUIXQXFKWuO6tzjNmH7AkqwexITm');
INSERT INTO users (username, email,password)
values ('super', 'super', '$2a$12$oPHpHHclxP9MDNwp2h3JY.LLvtaZYU7UyPiuSElODaZ2rw29B/ZBu');
INSERT INTO users (username, email,password)
values ('user1', 'user1', '$2a$12$ZfSvxRkaZxGS2P19EGXrveCLPayZYz/A7ZZpOl3gyXRu8J4nkCtma');

INSERT INTO users_roles(user_id, role_id) VALUES (1, 1);
INSERT INTO users_roles(user_id, role_id) VALUES (2, 2);
INSERT INTO users_roles(user_id, role_id) VALUES (3, 3);
INSERT INTO users_roles(user_id, role_id) VALUES (4, 1);

INSERT INTO wallets( name, img, user_id) VALUES ( 'Кеш', '', 1);
INSERT INTO wallets( name, img, user_id) VALUES ( 'VISA', '', 1);
INSERT INTO wallets( name, img, user_id) VALUES ( 'Кеш', '', 4);
INSERT INTO wallets( name, img, user_id) VALUES ( 'VISA', '', 4);

-- INSERT INTO types(name) VALUES ('DEBIT');
-- INSERT INTO types(name) VALUES ('CREDIT');

INSERT INTO debit_categories(name, operations_sum, id, img) VALUES ('Payment', 50000, 1, '');
INSERT INTO debit_categories(name, operations_sum, id, img) VALUES ('Present', 20000, 2, '');
INSERT INTO debit_categories(name, operations_sum, id, img) VALUES ('Bonus', 30000, 3, '');
INSERT INTO debit_categories(name, operations_sum, id, img) VALUES ('Rent', 20000, 4, '');
INSERT INTO debit_categories(name, operations_sum, id, img) VALUES ('Deposit', 4000, 5, '');

INSERT INTO credit_categories(name, budget, id, img) VALUES ('Food', 3000, 1, '');
INSERT INTO credit_categories(name, budget, id, img) VALUES ('Car', 1000, 2, '');
INSERT INTO credit_categories(name, budget, id, img) VALUES ('Caffe & Restaurants', 2000, 3, '');
INSERT INTO credit_categories(name, budget, id, img) VALUES ('Home', 5000, 4, '');
INSERT INTO credit_categories(name, budget, id, img) VALUES ('Present', 10000, 5, '');
INSERT INTO credit_categories(name, budget, id, img) VALUES ('Community', 3000, 6, '');

INSERT INTO debit_operations(id, name, value, category_id, wallet_id) VALUES (1, 'січень', 50000, 1, 2);
INSERT INTO debit_operations(id, name, value, category_id, wallet_id) VALUES (2, 'лютий', 50000, 1, 1);
INSERT INTO debit_operations(id, name, value, category_id, wallet_id) VALUES (3, 'березень', 50000, 1, 1);
INSERT INTO debit_operations(id, name, value, category_id, wallet_id) VALUES (4, 'мама', 20000, 2, 2);
INSERT INTO debit_operations(id, name, value, category_id, wallet_id) VALUES (5, 'шеф', 20000, 3, 1);
INSERT INTO debit_operations(id, name, value, category_id, wallet_id) VALUES (6, 'липинського', 22000, 4, 2);
INSERT INTO debit_operations(id, name, value, category_id, wallet_id) VALUES (7, 'приват', 4000, 5, 2);

INSERT INTO credit_operations(id, name, value, category_id, wallet_id) VALUES (1, 'Подоляни', 233, 1, 2);
INSERT INTO credit_operations(id, name, value, category_id, wallet_id) VALUES (2, 'Сільпо', 180, 1, 1);
INSERT INTO credit_operations(id, name, value, category_id, wallet_id) VALUES (3, 'Мийка', 80, 2, 2);
INSERT INTO credit_operations(id, name, value, category_id, wallet_id) VALUES (4, 'Файне', 360, 3, 1);
INSERT INTO credit_operations(id, name, value, category_id, wallet_id) VALUES (5, 'Диван', 40000, 4, 1);
INSERT INTO credit_operations(id, name, value, category_id, wallet_id) VALUES (6, 'Дружині за секс', 32000, 5, 1);
INSERT INTO credit_operations(id, name, value, category_id, wallet_id) VALUES (7, 'вода', 800, 6, 2);
INSERT INTO credit_operations(id, name, value, category_id, wallet_id) VALUES (8, 'світло', 400, 6, 2);


INSERT INTO products(name, number_of_items, price, operation_id) VALUES ('Огірки', 2, 42.00,  1);
INSERT INTO products(name, number_of_items, price, operation_id) VALUES ('Помідори', 2, 57.00,  1);
INSERT INTO products(name, number_of_items, price, operation_id) VALUES ('RedBull ', 1, 35.00,  1);

INSERT INTO products(name, number_of_items, price, operation_id) VALUES ('Огірки', 3, 42.00,  2);
INSERT INTO products(name, number_of_items, price, operation_id) VALUES ('Баклажани', 1, 54.00,  2);

INSERT INTO products(name, price, operation_id) VALUES ('в підгородньому', 80.00,  3);

INSERT INTO products(name, number_of_items, price, operation_id) VALUES ('курочка і картопля', 2, 190.00,  4);

INSERT INTO products(name, price, operation_id) VALUES ('на бамі в підвалі', 40000.00,  5);

INSERT INTO products(name, price, operation_id) VALUES ('Pixel 7Pro', 32000.00,  6);

-- INSERT INTO products(name, price, operation_id) VALUES ('Pixel 7Pro', 800.00,  7);
-- INSERT INTO products(name, price, operation_id) VALUES ('Pixel 7Pro', 400.00,  8);

UPDATE products SET sum = price* number_of_items WHERE operation_id = 1;
UPDATE products SET sum = price* number_of_items WHERE operation_id = 2;
UPDATE products SET sum = price* number_of_items WHERE operation_id = 3;
UPDATE products SET sum = price* number_of_items WHERE operation_id = 4;
UPDATE products SET sum = price* number_of_items WHERE operation_id = 5;
UPDATE products SET sum = price* number_of_items WHERE operation_id = 6;
UPDATE products SET sum = price* number_of_items WHERE operation_id = 7;
UPDATE products SET sum = price* number_of_items WHERE operation_id = 8;



