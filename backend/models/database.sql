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
    FOREIGN KEY (inventory_ID) REFERENCES product_category(id)
    FOREIGN KEY (category_id) REFERENCES product_inventory(id)
);
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    product_id INT,
    quantity INT,
    inventory_ID INT,
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
     FOREIGN KEY (inventory_ID) REFERENCES product_category(id)
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
    
INSERT INTO users (firstName, lastName, img, age, country, address1, address2, email, password, role_id) VALUES
    ('Mohammad', 'Alabed', 'user1.jpg', 25, 'Syria', 'amman', 'Address 2', 'user1@Gmail.com', '123456', 1),
    ('Qutada', 'Alblui', 'user2.jpg', 25, 'Jordan', 'Amman ', 'Airport ', 'qutada@example.com', '123456', 2),
    ('Abdallah', 'Aljmal', 'user3.jpg', 22, 'Jordan', 'Amman ', 'Airport St. ', 'Abd@example.com', '123456', 3);


INSERT INTO product_category (name, description) VALUES
    ('‘عدة نجارة', 'Category 1 Description'),
    ('عدة حدادة', 'Category 2 Description'),
    ('عدة كهربائي', 'Category 3 Description');

INSERT INTO products (name, description, img, quantity,price, category_id) VALUES
    ('Product 1', 'Product 1 Description', 'product1.jpg', 5,10, 1),
    ('Product 2', 'Product 2 Description', 'product2.jpg', 7,20, 2),
    ('Product 3', 'Product 3 Description', 'product3.jpg', 6,15, 3);

INSERT INTO order_items (product_id) VALUES
    (1),
    (3),
    (2);
INSERT INTO employeeCategory (category) VALUES
    (' نجار'),
    ('جداد'),
    ('مواسرجي');

INSERT INTO employees (firstName, lastName, description, category_id, work_hours, img, age, country, email, password, role_id) VALUES
    ('Employee 1', 'Lastname 1', 'Description 1', 1, '2023-09-22 08:00:00', 'employee1.jpg', 25, 'Country A', 'employee1@email.com', 'password1', 1),
    ('Employee 2', 'Lastname 2', 'Description 2', 2, '2023-09-22 09:00:00', 'employee2.jpg', 30, 'Country B', 'employee2@email.com', 'password2', 2),
    ('Employee 3', 'Lastname 3', 'Description 3', 3, '2023-09-22 10:00:00', 'employee3.jpg', 28, 'Country C', 'employee3@email.com', 'password3', 3);
