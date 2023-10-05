DROP DATABASE  project_5_database;
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
CREATE TABLE role_permission (
    id SERIAL PRIMARY KEY,
    role_id INT,
    permission_id INT,
    created_at timestamp DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
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
    email VARCHAR(255) UNIQUE NOT NULL,
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
    inventory_ID INT,
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (inventory_ID) REFERENCES product_category(id),
    FOREIGN KEY (category_id) REFERENCES product_inventory(id)
);
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    product_id INT,
    user_id INT,
    quantity INT,
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
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
    work_hours TEXT,
    img TEXT,
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
    product_id INT,
    total DECIMAL,
    shipping_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    shipping_status VARCHAR(255) DEFAULT 'Pending',
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
<<<<<<< HEAD
CREATE Table services (
    id SERIAL PRIMARY KEY,
    user_id INT,
    employee_id INT,
    created_at timestamp DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
=======

CREATE TABLE feadback_user (
id SERIAL PRIMARY KEY,
user_id INT ,
employee_id INT,
comment TEXT,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (employee_id) REFERENCES employees(id)
);

>>>>>>> 2e6808daf599a91cd1f727cce9029def5d073b26
--  psql -U postgres -f ./models/database.sql


INSERT INTO roles (role) VALUES
    ('Admin'),
    ('Employee'),
    ('User');

INSERT INTO permissions (permission) VALUES
    ('ALL_Permissions'),
    ('Create_Services'),
    ('Update_Profile'),
    ('Create_Orders'),
    ('Order_Service') ;

INSERT INTO role_permission (role_id, permission_id) VALUES
    (1, 1),
    (2, 2),
    (2, 3),
    (3, 3),
    (3, 4),
    (3, 5);
    
INSERT INTO product_inventory (quantity) VALUES (10),
    (15),
    (8);
INSERT INTO product_category (name, description) VALUES
    ('‘عدة نجارة', 'Category 1 Description'),
    ('عدة حدادة', 'Category 2 Description'),
    ('عدة كهربائي', 'Category 3 Description');

INSERT INTO products (name, description, img, price, category_id, inventory_id) VALUES
    ('Product 1', 'Description for Product 1', 'img1.jpg', 20, 1, 1),
    ('Product 2', 'Description for Product 2', 'img2.jpg', 25, 3, 2),
    ('Product 3', 'Description for Product 3', 'img3.jpg', 30, 2, 3);


-- INSERT INTO order_items (product_id, quantity, ) VALUES
--     (1),
--     (3),
--     (2);

INSERT INTO employees (firstName, lastName, description, country) VALUES

    ('Qtada', 'Ahmad', 'work in electrical','Jordan'),
    ('same', 'rame', 'work in machincal','Ksa'),
    ('ramez', 'salem', 'work in wood','Jordan');

