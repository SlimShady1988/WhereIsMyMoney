create table users
(
    id                  bigint generated by default as identity primary key,
    email               varchar(255) not null unique,
    password            varchar(255) not null,
    username            varchar(255) not null unique,
    img                 TEXT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table roles
(
    id                  bigint generated by default as identity primary key,
    name                varchar(20),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table users_roles
(
    user_id             bigint not null constraint users_roles_users_fk references users,
    role_id             bigint not null constraint roles_user_roles_fk references roles
);

create table wallets
(
    id                  bigint generated by default as identity primary key,
    name                varchar(255) not null,
    balance             real DEFAULT 0,
    currency            varchar(255) not null,
    img                 TEXT NOT NULL,
    user_id             bigint       not null constraint wallets_persons_fk references users,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table debit_categories
(
    id                  bigint generated by default as identity primary key,
    name                varchar(255) not null,
    status              varchar(255) not null default 'disabled',
    operations_sum      real DEFAULT 0,
    img                 TEXT NOT NULL,
    user_id             bigint not null constraint debit_user_fk references users,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table credit_categories
(
    id                  bigint generated by default as identity primary key,
    name                varchar(255) not null,
    status              varchar(255) not null default 'disabled',
    budget              real DEFAULT 0,
    img                 TEXT NOT NULL,
    user_id             bigint not null constraint credit_user_fk references users,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table debit_operations
(
    id                  bigint generated by default as identity primary key,
    name                varchar(255) not null,
    value               real DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    category_id         bigint constraint operations_categories_fk references debit_categories,
    wallet_id           bigint constraint d_operations_wallets_fk references wallets
);

create table credit_operations
(
    id                  bigint generated by default as identity primary key,
    name                varchar(255) not null,
    status              varchar(255) not null default 'done',
    value               real DEFAULT 0,
    category_id         bigint constraint cr_operations_categories_fk references credit_categories,
    wallet_id           bigint constraint operations_wallets_fk references wallets,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


create table products
(
    id                  bigint generated by default as identity primary key,
    name                varchar(255) not null,
    number_of_items     integer default 1,
    price               real default 0,
    sum                 real null,
    operation_id        bigint not null constraint products_cr_operations_fk references credit_operations,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- create table operations_products
-- (
--     operation_id bigint not null
--         constraint fkkqbx54xvdfqjjy1ux88ls4ixr
--             references operations,
--     product_id   bigint not null
--         constraint fk9b7jqfjta5y08kqw2v673x9yi
--             references products
-- );

create table addresses
(
    id                  bigint generated by default as identity primary key,
    ap                  integer,
    city                varchar(255),
    code                integer,
    country             varchar(255),
    street              varchar(255),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


