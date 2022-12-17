INSERT INTO roles (id, name) values (1, 'ROLE_USER');
INSERT INTO roles (id, name) values (2, 'ROLE_ADMIN');
INSERT INTO roles (id, name) values (3, 'ROLE_SUPERADMIN');

INSERT INTO users (username,email,password)
values ('user', 'user', '$2a$12$ZfSvxRkaZxGS2P19EGXrveCLPayZYz/A7ZZpOl3gyXRu8J4nkCtma');
INSERT INTO users (username,email,password)
values ('admin', 'admin', '$2a$12$G6goV3EbL.0s1q0PrubOa./BCRUIXQXFKWuO6tzjNmH7AkqwexITm');
INSERT INTO users (username,email,password)
values ('super', 'super', '$2a$12$oPHpHHclxP9MDNwp2h3JY.LLvtaZYU7UyPiuSElODaZ2rw29B/ZBu');
INSERT INTO users (username,email,password)
values ('user1', 'user1', '$2a$12$ZfSvxRkaZxGS2P19EGXrveCLPayZYz/A7ZZpOl3gyXRu8J4nkCtma');

INSERT INTO users_roles(user_id, role_id) VALUES (1, 1);
INSERT INTO users_roles(user_id, role_id) VALUES (2, 2);
INSERT INTO users_roles(user_id, role_id) VALUES (3, 3);
INSERT INTO users_roles(user_id, role_id) VALUES (4, 1);

INSERT INTO wallets(id, name, user_id) VALUES (1, 'Кеш', 1);
INSERT INTO wallets(id, name, user_id) VALUES (2, 'VISA', 1);
INSERT INTO wallets(id, name, user_id) VALUES (3, 'Кеш', 4);
INSERT INTO wallets(id, name, user_id) VALUES (4, 'VISA', 4);

INSERT INTO types(name) VALUES ('DEBIT');
INSERT INTO types(name) VALUES ('CREDIT');

INSERT INTO categories(name, id, type_id) VALUES ('payment', 1, 1);
INSERT INTO categories(name, id, type_id) VALUES ('present', 2, 1);

INSERT INTO categories(name, id, type_id) VALUES ('eating', 3, 2);
INSERT INTO categories(name, id, type_id) VALUES ('car', 4, 2);
INSERT INTO categories(name, id, type_id) VALUES ('family', 5, 2);

INSERT INTO operations(id, name, category_id, type_id, wallet_id) VALUES (1, 'січень', 1, 1, 2);
INSERT INTO operations(id, name, category_id, type_id, wallet_id) VALUES (2, 'на пянку', 2, 1, 1);
INSERT INTO operations(id, name, category_id, type_id, wallet_id) VALUES (3, 'покупка року', 4, 2, 2);
INSERT INTO operations(id, name, category_id, type_id, wallet_id) VALUES (4, 'сільпо', 3, 2, 1);
INSERT INTO operations(id, name, category_id, type_id, wallet_id) VALUES (5, 'Дружині за секс', 5, 2, 1);

INSERT INTO products(name, sum, category_id, operation_id) VALUES ('Винагорода за бездіяльність', 5000, 1, 1);
INSERT INTO products(name, sum, category_id, operation_id) VALUES ('Подарунок від коханки', 1000, 2, 2);

INSERT INTO products(name, sum, category_id, operation_id) VALUES ('Ford MustangGT Mach-E', 23700, 4, 3);
INSERT INTO products(name, number_of_items, price, category_id, operation_id) VALUES ('Огірки', 2, 42.00, 3, 4);
INSERT INTO products(name, number_of_items, price, category_id, operation_id) VALUES ('Помідори', 2, 57.00, 3, 4);
INSERT INTO products(name, number_of_items, price, category_id, operation_id) VALUES ('RedBull ', 1, 35.00, 3, 4);
INSERT INTO products(name, number_of_items, price, category_id, operation_id) VALUES ('Pixel 7Pro ', 1, 31500.00, 5, 5);

UPDATE products SET sum = price* number_of_items WHERE operation_id = 4;
UPDATE products SET sum = price* number_of_items WHERE operation_id = 5;


