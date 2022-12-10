create table users
(
    id         bigint generated by default as identity
        primary key,
    email      varchar(255) not null unique,
    password   varchar(255) not null,
    username   varchar(255) not null unique,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table roles
(
    id         bigint generated by default as identity
        primary key,
    name       varchar(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table users_roles
(
    user_id bigint not null
        constraint fk2o0jvgh89lemvvo17cbqvdxaa
            references users,
    role_id bigint not null
        constraint fkj6m8fwv7oqv74fcehir1a9ffy
            references roles
);

create table types
(
    id         bigint generated by default as identity
        primary key,
    name       varchar(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table wallets
(
    id         bigint generated by default as identity
        primary key,
    name       varchar(255) not null,
    user_id    bigint       not null
        constraint wallets_persons_fk
            references users,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table types_wallets
(
    type_id   bigint not null
        constraint fkeojq5afwlkm1ue7w7o9wus5cl
            references types,
    wallet_id bigint not null
        constraint fkbc7e6ut5r73vuhkvcey0d6l68
            references wallets
);

create table categories
(
    id         bigint generated by default as identity
        primary key,
    name       varchar(255) not null,
    type_id    bigint       not null
        constraint uk_691ep1u82ccx9474jibjpikr7
            unique
        constraint categories_types_fk
            references types,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table operations
(
    id          bigint generated by default as identity
        primary key,
    name        varchar(255) not null,
    sum         integer      not null,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    category_id bigint
        constraint operations_categories_fk
            references categories,
    type_id     bigint
        constraint operations_types_fk
            references types,
    wallet_id   bigint
        constraint operations_wallets_fk
            references wallets
);

create table products
(
    id              bigint generated by default as identity
        primary key,
    name            varchar(255) not null,
    number_of_items integer,
    price           real,
    sum             real,
    category_id     bigint       not null
        constraint fkog2rp4qthbtt2lfyhfo32lsw9
            references categories,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

create table operations_products
(
    operation_id bigint not null
        constraint fkkqbx54xvdfqjjy1ux88ls4ixr
            references operations,
    product_id   bigint not null
        constraint fk9b7jqfjta5y08kqw2v673x9yi
            references products
);

create table addresses
(
    id         bigint generated by default as identity
        primary key,
    ap         integer,
    city       varchar(255),
    code       integer,
    country    varchar(255),
    street     varchar(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- alter table users
--     owner to postgres;


