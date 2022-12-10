INSERT INTO roles (name) values ('ROLE_USER');
INSERT INTO roles (name) values ('ROLE_ADMIN');
INSERT INTO roles (name) values ('ROLE_SUPERADMIN');

INSERT INTO users (username,email,password)
values ('user', 'user', '$2a$12$ZfSvxRkaZxGS2P19EGXrveCLPayZYz/A7ZZpOl3gyXRu8J4nkCtma');
INSERT INTO users (username,email,password)
values ('admin', 'admin', '$2a$12$G6goV3EbL.0s1q0PrubOa./BCRUIXQXFKWuO6tzjNmH7AkqwexITm');
INSERT INTO users (username,email,password)
values ('super', 'super', '$2a$12$oPHpHHclxP9MDNwp2h3JY.LLvtaZYU7UyPiuSElODaZ2rw29B/ZBu');

INSERT INTO users_roles(user_id, role_id) VALUES (1, 1);
INSERT INTO users_roles(user_id, role_id) VALUES (2, 2);
INSERT INTO users_roles(user_id, role_id) VALUES (3, 3);
