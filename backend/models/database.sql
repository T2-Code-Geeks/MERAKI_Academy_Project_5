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
    order_items JSON,
    payment_method VARCHAR(255),
    total DECIMAL,
    shipping_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    shipping_status VARCHAR(255) DEFAULT 'Pending',
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE hiring (
    id SERIAL PRIMARY KEY,
    user_id INT,
    employee_id INT,
    note TEXT,
    Date timestamp,
    Status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE Table services (
    id SERIAL PRIMARY KEY,
    user_id INT,
    employee_id INT,
    created_at timestamp DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);


CREATE TABLE feadback_user (
id SERIAL PRIMARY KEY,
user_id INT ,
employee_id INT,
comment TEXT,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (employee_id) REFERENCES employees(id)
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
    
INSERT INTO product_inventory (quantity) VALUES 
    (10),
    (15),
    (8);
INSERT INTO product_category (name, description) VALUES
    ('Electrical Equipment', 'Equipments related to workshops, such as extending electricity and installing lighting'),
    ('Construction Equipment', 'Equipment that assists in construction and restoration operations'),
    ('Water expansion equipment', 'Tools used to extend water lines to all parts of the building');
    ('Public safety equipment', 'Equipment that protects the craftsman from work hazards'),
  


INSERT INTO products (name, description, img, price, category_id, inventory_id) VALUES
    ('Pliers', 'Most frequently referred to as cutting pliers or lineman’s pliers are a staple on any electrical technician’s tool kit. They are primarily utilized for cutting wire', 'https://tse2.mm.bing.net/th?id=OIP.12Sdg6v34pSEqne_XovimwHaHa&pid=Api&P=0&h=220', 12, 1, 1),
    ('Screwdrivers', 'Electrical experts utilize different top-notch insulated screwdrivers, or a screwdriver set', 'https://tse4.mm.bing.net/th?id=OIP.hjJwPQbZ5X-0ZO_nBHKOjgHaHa&pid=Api&P=0&h=220', 24, 1, 2),
    ('Tape Measure', 'While working with wiring, it’s crucial to know definite measurements while cutting and stripping. A simple retractable measuring tape gets the job done', 'https://tse3.mm.bing.net/th?id=OIP.hbOz5atgfMRaBeFnmBleDAHaGX&pid=Api&P=0&h=220', 30, 1, 3);
    ('Electrical Tape', 'It is made from plastic, vinyl, or fiberglass fabric, this sticky material is pressure-sensitive and essential for insulating wires or different materials that conduct electricity.', 'https://tse1.mm.bing.net/th?id=OIP.pLsdLZfpQJZ2N8IF9I7hcQAAAA&pid=Api&P=0&h=220', 22, 1, 1),
    ('Cable Ties', 'They are also known as zip ties; these inexpensive fasteners are fundamental tools for binding electrical cables or wires together.', 'https://tse1.mm.bing.net/th?id=OIP.9fR45AVPlA5ecyuj2lWg6gHaHa&pid=Api&P=0&h=220', 24, 1, 2),
    ('Electric Drills', 'Electrical technicians consistently put in new lighting fixtures or need to dismantle installed hardware to access wiring and other electrical parts.', 'https://tse1.mm.bing.net/th?id=OIP.LAM0x4cDR7niTlm4mynRWQHaHa&pid=Api&P=0&h=220', 40, 1, 3);
     ('Wire/Cable Lugs', 'This electrical tool is similar to features utilized on jumper cables and vehicle batteries, wire, and cable lugs connect wires to appliances, cables, and different gadgets needing power.', 'https://tse4.mm.bing.net/th?id=OIP.a1IHvAUZLJ78Vfs05Zq2_QHaE8&pid=Api&P=0&h=220', 30, 1, 1),
    ('Coax Connector', 'Coax connectors interface cables to devices, while at the same time safeguarding the cable from shredding.', 'https://tse4.mm.bing.net/th?id=OIP.AKTXzjoaFStwXyGSdE0FRQHaHa&pid=Api&P=0&h=220', 55, 1, 2),
    ('Level', 'While installing light fixtures, it is critical to track down precise points for placement. An electrical tools list is incomplete without a standard level', 'https://tse1.mm.bing.net/th?id=OIP.AyoTIYIR1qQ29tgvOm2V8wHaF3&pid=Api&P=0&h=220', 3, 1, 3);
    ('Wire Strippers', 'Wire Stripper – Proficient electrical experts consistently take the plastic sheathing from wires to expose the copper and make altered associations with other wiring or parts.', 'https://tse3.mm.bing.net/th?id=OIP.sIJsUTX_mp5mocWn_tVt7QHaHa&pid=Api&P=0&h=220', 23, 1, 1),
    ===============================================================================================================================================================================
    
    ('Trowel', 'A trowel is a small hand tool used for digging, applying, smoothing, or moving small amounts of viscous or particulate material.', 'https://tse2.mm.bing.net/th?id=OIP.12Sdg6v34pSEqne_XovimwHaHa&pid=Api&P=0&h=220', 12, 1, 1),
    ('Concrete Mixer', 'Great prices on a comprehensive selection mixers from a variety of manufacturers. Discount Equipment - New and Used Construction Equipment', 'https://tse4.mm.bing.net/th?id=OIP.hjJwPQbZ5X-0ZO_nBHKOjgHaHa&pid=Api&P=0&h=220', 24, 1, 2),
    ('Gloves', 'A glove is a garment covering the hand, with separate sheaths or openings for each finger including the thumb.', 'https://tse3.mm.bing.net/th?id=OIP.hbOz5atgfMRaBeFnmBleDAHaGX&pid=Api&P=0&h=220', 30, 1, 3);
    ('Plumb Bob', 'A plumb bob, plumb bob level, or plummet, is a weight, usually with a pointed tip on the bottom, suspended from a string and used as a vertical direction as a reference line', 'https://tse1.mm.bing.net/th?id=OIP.pLsdLZfpQJZ2N8IF9I7hcQAAAA&pid=Api&P=0&h=220', 22, 1, 1),
    ('Head Pan', 'A head pan, just as its name implies, is a pan that can be placed on your head. However, the head pan is not used for cooking food as other pans do.', 'https://tse1.mm.bing.net/th?id=OIP.9fR45AVPlA5ecyuj2lWg6gHaHa&pid=Api&P=0&h=220', 24, 1, 2),
    ('Vibrator', 'Vibrators are sex toys that are used on the body to create sexual stimulation. Modern vibrators, also known as massagers, use electronic power to create vibrations or pulses', 'https://tse1.mm.bing.net/th?id=OIP.LAM0x4cDR7niTlm4mynRWQHaHa&pid=Api&P=0&h=220', 40, 1, 3);
     ('Line Level', 'This electrical tool is similar to features utilized on jumper cables and vehicle batteries, wire, and cable lugs connect wires to appliances, cables, and different gadgets needing power.', 'https://tse4.mm.bing.net/th?id=OIP.a1IHvAUZLJ78Vfs05Zq2_QHaE8&pid=Api&P=0&h=220', 30, 1, 1),
    ('Framing Square', 'Coax connectors interface cables to devices, while at the same time safeguarding the cable from shredding.', 'https://tse4.mm.bing.net/th?id=OIP.AKTXzjoaFStwXyGSdE0FRQHaHa&pid=Api&P=0&h=220', 55, 1, 2),
    ('Framing Hammer', 'While installing light fixtures, it is critical to track down precise points for placement. An electrical tools list is incomplete without a standard level', 'https://tse1.mm.bing.net/th?id=OIP.AyoTIYIR1qQ29tgvOm2V8wHaF3&pid=Api&P=0&h=220', 3, 1, 3);
    ('Cordless Drill', 'Wire Stripper – Proficient electrical experts consistently take the plastic sheathing from wires to expose the copper and make altered associations with other wiring or parts.', 'https://tse3.mm.bing.net/th?id=OIP.sIJsUTX_mp5mocWn_tVt7QHaHa&pid=Api&P=0&h=220', 23, 1, 1),
INSERT INTO employees (firstName, lastName, description, country) VALUES
    ('Qtada', 'Ahmad', 'work in electrical','Jordan'),
    ('same', 'rame', 'work in machincal','Ksa'),
    ('ramez', 'salem', 'work in wood','Jordan');

