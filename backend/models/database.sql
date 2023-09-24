DROP DATABASE IF EXISTS project_5_database;
CREATE DATABASE project_5_database;

\c project_5_database;

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(255),
    created_at timestamp DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0
);
CREATE TABLE permissions(
    id SERIAL PRIMARY KEY,
    permission VARCHAR(255),
    created_at timestamp DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    img TEXT,
    age INT,
    country VARCHAR(255),
    address1 VARCHAR(255),
    address2 VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE user_payment (
    id SERIAL PRIMARY KEY,
    user_id INT,
    payment_method VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE product_category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE product_inventory (
    id SERIAL PRIMARY KEY,
    quantity INT,
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    img TEXT,
    price INT,
    category_id INT,
    inventory_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES product_category(id),
    FOREIGN KEY (inventory_id) REFERENCES product_inventory(id)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    product_id INT,
    quantity INT,
    inventory_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (inventory_id) REFERENCES product_inventory(id)
);
CREATE TABLE employeeCategory(
    id SERIAL PRIMARY KEY,
    category VARCHAR(80),
    created_at timestamp DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0
);
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    description VARCHAR(255),
    category_id INT,
    work_hours timestamp,
    img text,
    age INT,
    country VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role_id INT,
    created_at timestamp DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (category_id) REFERENCES employeeCategory(id)
);
CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    user_id INT,
    employee_id INT,
    payment_id INT,
    product_id INT
    total DECIMAL,
    shipping_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    shipping_status VARCHAR(255),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (payment_id) REFERENCES user_payment(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
CREATE Table hiring (
    id SERIAL PRIMARY KEY,
    user_id INT,
    employee_id INT,
    created_at timestamp DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE role_permission (
    id SERIAL PRIMARY KEY,
    role_id INT,
    permission_id INT,
    created_at timestamp DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);
--  psql -U postgres -f ./modules/database.sql

