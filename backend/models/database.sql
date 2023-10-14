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
    description VARCHAR(400),
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
    ('Water expansion equipment', 'Tools used to extend water lines to all parts of the building'),
    ('Public safety equipment', 'Equipment that protects the craftsman from work hazards');
  


INSERT INTO products (name, description, img, price, category_id, inventory_id) VALUES

    ('Pliers', 'Most frequently referred to as cutting pliers or lineman’s pliers are a staple on any electrical technician’s tool kit. They are primarily utilized for cutting wire', 'https://tse2.mm.bing.net/th?id=OIP.12Sdg6v34pSEqne_XovimwHaHa&pid=Api&P=0&h=220', 12, 1, 1),
    ('Screwdrivers', 'Electrical experts utilize different top-notch insulated screwdrivers, or a screwdriver set', 'https://tse4.mm.bing.net/th?id=OIP.hjJwPQbZ5X-0ZO_nBHKOjgHaHa&pid=Api&P=0&h=220', 24, 1, 2),
    ('Tape Measure', 'While working with wiring, it’s crucial to know definite measurements while cutting and stripping. A simple retractable measuring tape gets the job done', 'https://tse3.mm.bing.net/th?id=OIP.hbOz5atgfMRaBeFnmBleDAHaGX&pid=Api&P=0&h=220', 30, 1, 3),
    ('Electrical Tape', 'It is made from plastic, vinyl, or fiberglass fabric, this sticky material is pressure-sensitive and essential for insulating wires or different materials that conduct electricity.', 'https://tse1.mm.bing.net/th?id=OIP.pLsdLZfpQJZ2N8IF9I7hcQAAAA&pid=Api&P=0&h=220', 22, 1, 1),
    ('Cable Ties', 'They are also known as zip ties; these inexpensive fasteners are fundamental tools for binding electrical cables or wires together.', 'https://tse1.mm.bing.net/th?id=OIP.9fR45AVPlA5ecyuj2lWg6gHaHa&pid=Api&P=0&h=220', 24, 1, 2),
    ('Electric Drills', 'Electrical technicians consistently put in new lighting fixtures or need to dismantle installed hardware to access wiring and other electrical parts.', 'https://tse1.mm.bing.net/th?id=OIP.LAM0x4cDR7niTlm4mynRWQHaHa&pid=Api&P=0&h=220', 40, 1, 3),
    ('Wire/Cable Lugs', 'This electrical tool is similar to features utilized on jumper cables and vehicle batteries, wire, and cable lugs connect wires to appliances, cables, and different gadgets needing power.', 'https://tse4.mm.bing.net/th?id=OIP.a1IHvAUZLJ78Vfs05Zq2_QHaE8&pid=Api&P=0&h=220', 30, 1, 1),
    ('Coax Connector', 'Coax connectors interface cables to devices, while at the same time safeguarding the cable from shredding.', 'https://tse4.mm.bing.net/th?id=OIP.AKTXzjoaFStwXyGSdE0FRQHaHa&pid=Api&P=0&h=220', 55, 1, 2),
    ('Level', 'While installing light fixtures, it is critical to track down precise points for placement. An electrical tools list is incomplete without a standard level', 'https://tse1.mm.bing.net/th?id=OIP.AyoTIYIR1qQ29tgvOm2V8wHaF3&pid=Api&P=0&h=220', 3, 1, 3),
    ('Wire Strippers', 'Wire Stripper – Proficient electrical experts consistently take the plastic sheathing from wires to expose the copper and make altered associations with other wiring or parts.', 'https://tse3.mm.bing.net/th?id=OIP.sIJsUTX_mp5mocWn_tVt7QHaHa&pid=Api&P=0&h=220', 23, 1, 1),

    
    ('Trowel', 'A trowel is a small hand tool used for digging, applying, smoothing, or moving small amounts of viscous or particulate material.', 'https://ik.imagekit.io/pimberly/5a573819182f915efb7bd083/66d7340c/5cffae3a91b03b5baf000024.jpg', 34, 2, 1),
    ('Concrete Mixer', 'Great prices on a comprehensive selection mixers from a variety of manufacturers. Discount Equipment - New and Used Construction Equipment', 'https://tse1.mm.bing.net/th?id=OIP.VerdhOYJ76pdnjCLx3TAFQHaHa&pid=Api&P=0&h=220', 66, 2, 2),
    ('Gloves', 'A glove is a garment covering the hand, with separate sheaths or openings for each finger including the thumb.', 'https://tse4.mm.bing.net/th?id=OIP.BxjR3TBASU9kK4v81G8UbQHaHa&pid=Api&P=0&h=220', 43, 2, 3),
    ('Plumb Bob', 'A plumb bob, plumb bob level, or plummet, is a weight, usually with a pointed tip on the bottom, suspended from a string and used as a vertical direction as a reference line', 'https://tse4.mm.bing.net/th?id=OIP.vs7TNLe4wylgIl-AZLMN2QHaHU&pid=Api&P=0&h=220', 34, 2, 1),
    ('Head Pan', 'A head pan, just as its name implies, is a pan that can be placed on your head. However, the head pan is not used for cooking food as other pans do.', 'https://tse3.mm.bing.net/th?id=OIP.66PvU7YSOTO2Dz3uH4vcVgHaHa&pid=Api&P=0&h=220',64, 2, 2),
    ('Vibrator', 'Vibrators are sex toys that are used on the body to create sexual stimulation. Modern vibrators, also known as massagers, use electronic power to create vibrations or pulses', 'https://tse3.mm.bing.net/th?id=OIP.KocbBuFNZFg7zMM2nhfSZAHaHa&pid=Api&P=0&h=220', 40, 2, 3),
    ('Line Level', 'Line levels (or "string" levels) are a special brand of spirit level used for leveling across longer distances. They can be attached to a tightly pulled string to find level between two stakes', 'https://tse3.mm.bing.net/th?id=OIP.l47pOCWMpbXaSnqzoUb0_wHaHa&pid=Api&P=0&h=220', 32, 2, 1),
    ('Framing Square', 'A framing square is a tool commonly used by carpenters and other tradespeople to mark walls or other materials accurately', 'https://tse3.mm.bing.net/th?id=OIP.1EgQNhvG6EmrUKaBZSsU_gHaEQ&pid=Api&P=0&h=220', 12, 2, 2),
    ('Framing Hammer', 'A framing hammer has a heavy head, a flat prybar-like claw, and a long handle for labor-efficient driving of nails or ripping apart boards', 'https://tse3.mm.bing.net/th?id=OIP.ur3Or_gTxQFCV-Dr6p-YPAHaHH&pid=Api&P=0&h=220',23, 2, 3),
    ('Cordless Drill', 'is simply a power drill that works without a cord. You can use a cordless drill driver to drill holes on walls', 'https://tse2.mm.bing.net/th?id=OIP.-v1Njb-N5sQg88w0jbo0vwHaGu&pid=Api&P=0&h=220', 33, 2, 1),
   
    
    ('Hacksaw', 'Plumbers commonly use hacksaws to cut perfectly in the pipe, and sometimes electricians to cut conduit. There are many different types of hardware that plumbers need to cut through, including pipes, nuts, bolts, and screws.', 'https://www.theengineerspost.com/wp-content/uploads/2023/01/Hacksaw-768x419.jpg?ezimgfmt=ng:webp/ngcb19', 34, 3, 1),
    ('Hole Saw', ' hole saw is also a useful addition to the toolkit that is needed in some cases. With the help of a hole saw, ', 'https://www.theengineerspost.com/wp-content/uploads/2023/01/Hole-Saw-300x255.jpg?ezimgfmt=ng:webp/ngcb19', 66, 3, 2),
    ('Mole Grip', 'Mole grips are types of metal pliers characterized by the ability to be locked in place. It is usually made of hardened steel. The upper jaw and handle are fixed.', 'https://www.theengineerspost.com/wp-content/uploads/2023/01/Mole-Grip-300x180.jpg?ezimgfmt=ng:webp/ngcb19', 43, 3, 3),
    ('Tubing Cutter', 'Any professional plumber who deals with copper or plastic piping regularly knows that, eventually, it needs to be removed, replaced, and resized. A tubing cutter is useful for cutting tubes to a specified length.', 'https://www.theengineerspost.com/wp-content/uploads/2023/01/Tubing-Cutter-300x253.jpg?ezimgfmt=ng:webp/ngcb19', 34, 3, 1),
    ('Thread Sealing Tape', 'Thread seal tape is a versatile film tape used by most plumbers, usually a joint sealer to seal pipe threads. Sometimes it is used as a leak preventer. This type of device is also known as Teflon tape, plumber’s tape, or polytetrafluoroethylene film, abbreviated as PTFE tape..', 'https://www.theengineerspost.com/wp-content/uploads/2023/01/Thread-Sealing-Tape-300x300.jpg?ezimgfmt=ng:webp/ngcb19',64, 3, 2),
    ('Pliers', 'Plumbers also use pliers every day. It is best for plumbers to use these smaller tools for loosening and tightening nuts and bolts that are too small to grasp with a wrench', 'https://www.theengineerspost.com/wp-content/uploads/2023/01/Plier-2-290x300.jpg?ezimgfmt=ng:webp/ngcb19', 40, 3, 3),
    ('Ratcheting Pipe Threader Set', 'The ratcheting pipe threader tool allows you to cut threads into the pipe so that it will accept the fitting when the pipes are joined together.', 'https://www.theengineerspost.com/wp-content/uploads/2023/01/Ratchet-Pipe-Threader-Set-300x290.jpg?ezimgfmt=ng:webp/ngcb19', 32, 3, 1),
    ('Adjustable Wrench', 'Also known as an adjustable pipe or Stillson, the wrench is used to grip or bend pipe or circular bars.', 'https://www.theengineerspost.com/wp-content/uploads/2023/01/Adjustable-Wrench-300x270.jpg?ezimgfmt=ng:webp/ngcb19', 22, 3, 2),
    ('Pipe Wrench', 'The pipe wrench operates as the plumber’s most enormous wrench. These wrenches are good for tightening and loosening nuts and fittings on pipes.', 'https://www.theengineerspost.com/wp-content/uploads/2023/01/Pipe-Wrench-300x287.jpg?ezimgfmt=ng:webp/ngcb19',23, 3, 3),
    ('Drain Inspection Camera', 'Most plumbers today carry inspection cameras, also called borescopes, which used to be considered top technology in the plumbing trade. These tiny cameras attached to a long, flexible cable are inserted deep into drains and sewer lines.', 'https://www.theengineerspost.com/wp-content/uploads/2023/01/Drain-Inspection-Camera-298x300.jpg?ezimgfmt=ng:webp/ngcb19', 223, 3, 1),

 
    
    ('safety Glasses', 'Protective eyewear is important in certain workplaces to shield employees’ eyes from flying particles, hot liquids, molten metal, chemical gases, and harmful radiation. This PPE must fit closely and comfortably to the wearer’s face, be cleanable, and not restrict vision or movement.', 'https://tse4.mm.bing.net/th?id=OIP.qm3hmTklq5m6gCbjUqbPvgHaEb&pid=Api&P=0&h=220', 34, 2, 1),
    ('Hearing Protection', 'Earplugs and earmuffs are used to protect workers from exposure to excessive noise, which can lead to irreparable hearing damage and increased stress.', 'https://tse1.mm.bing.net/th?id=OIP.UvZvVY9jsnmD-YyumfZL7AHaHa&pid=Api&P=0&h=220', 66, 2, 2),
    ('Safety Golves', 'Gloves, finger guards, and arm coverings will protect employees from the skin damage caused by cuts, chemical and thermal burns, and punctures. ', 'https://tse4.mm.bing.net/th?id=OIP.tbkM7sQrnMeizynFeZ7IbQHaHa&pid=Api&P=0&h=220', 43, 2, 3),
    ('Safty Helmets', ' Safety helmets, also known, are essential pieces of personal protective equipment used in various industries and professions to protect the head from injuries', 'https://tse3.mm.bing.net/th?id=OIP.LJvweuuvldfSQIh9sNAFJgHaFh&pid=Api&P=0&h=220', 34, 2, 1),
    ('Safety Shoes', 'Leggings, foot guards, and safety shoes help protect workers from a range of workplace hazards including falling, rolling, or sharp objects; and hot surfaces; and electrical hazards.', 'https://tse1.mm.bing.net/th?id=OIP.-nmwBDMsb2c3yKYPwbn3mAHaE0&pid=Api&P=0&h=220',64, 2, 2),
    ('Face Shield', 'Face shields consist of a visor, a lightweight plastic or metal frame, and a suspension system that attaches the shield to the head of the wearer. Providing full face protection,', 'https://tse3.mm.bing.net/th?id=OIP.Qy3JCqmNV2ldhlITBN8D8AHaHa&pid=Api&P=0&h=220', 40, 2, 3),
    ('Earplugs and Earmuffs', 'Earplugs and earmuffs are used to protect workers from exposure to excessive noise, which can lead to irreparable hearing damage and increased stress.', 'https://tse2.mm.bing.net/th?id=OIP.6yNsbjWkIbM2QccdfQseNQHaHa&pid=Api&P=0&h=220', 32, 2, 1),
    ('Surgical Face Masks', 'A surgical mask — often referred to as a face mask — is a loose-fitting, disposable device that covers the wearer’s mouth and nose', 'https://cdn.shopify.com/s/files/1/0300/3065/9677/products/1_49ec74f1-9e4b-4fa6-b53f-c83ea6d755f0_1024x1024@2x.jpg?v=1595502409', 12, 2, 2),
    ('Respirators', 'Respirators have long been used in a manufacturing setting to protect employees from inhaling air contaminated with harmful dust, fumes, gases, or sprays.', 'https://tse2.mm.bing.net/th?id=OIP.IRUoXE9dnX0i5NNpB10VJwAAAA&pid=Api&P=0&h=220',23, 2, 3),
    ('Hard Hats', 'Hard hats serve to protect industrial workers from head injuries caused by falling, flying, or fixed objects.', 'https://tse4.mm.bing.net/th?id=OIP.Cium1-8qsbZklf0mY8TWggHaFn&pid=Api&P=0&h=220', 33, 2, 1);
   

     
     INSERT INTO employeeCategory (category) VALUES
     ('Electrical craftsmen group'),
     ('extending water pipes craftsmen group'),
     ('Construction craftsmen group'),
     ('plumbing craftsmen group');

    INSERT INTO employees (firstName, lastName, description, category_id , work_hours ,img,age,country,role_id) VALUES

('Qtada', 'Ahmad', 'work in electrical',1 ,'(8-2) pm','https://tse3.mm.bing.net/th?id=OIP.5puLayR0ov1MwxPuSIpZQgHaE7&pid=Api&P=0&h=220',22,'Jordan',2),
('ahmad', 'Rame', 'work in electrical',1 ,'(8-3) pm','https://tse2.mm.bing.net/th?id=OIP.F2S-pXzG9Vt3AwAPtyX6MAAAAA&pid=Api&P=0&h=220',45,'Jordan',2),
('Ibraheem', 'Nader', 'work in electrical',1 ,'(8-5) pm','https://tse4.mm.bing.net/th?id=OIP.-NTYdJxtsHFwqGBselo2WQAAAA&pid=Api&P=0&h=220',35,'Jordan',2),
('Same', 'Fares', 'work in electrical',1 ,'(9-2) pm','https://tse2.mm.bing.net/th?id=OIP.dMtsEUBiL4hIbX4PUWboOQHaHa&pid=Api&P=0&h=220',24,'Jordan',2),
('Rakan', 'Lafee', 'work in electrical',1 ,'(10-7) pm','https://tse1.mm.bing.net/th?id=OIP.qjfojLRfx8j2i8OXvAnnbgHaH7&pid=Api&P=0&h=220',15,'Jordan',2),
('Issa', 'Omer', 'work in electrical',1 ,'(4-12) pm','https://tse2.mm.bing.net/th?id=OIP.8_tN-TVGlFT2rxPQ3aKgPAAAAA&pid=Api&P=0&h=220',54,'Jordan',2),
('Omer', 'Mohamed', 'work in electrical',1 ,'(8-5) pm','https://tse1.mm.bing.net/th?id=OIP.MXDypvESMAdr9hduu7KRXAAAAA&pid=Api&P=0&h=220',34,'Jordan',2),
('Ishref', 'salem', 'work in electrical',1 ,'(8-6) pm','https://tse2.mm.bing.net/th?id=OIP.E_ktUqo4tPovCEe4sis4GAHaIP&pid=Api&P=0&h=220',42,'Jordan',2),
('momen', 'Ahmad', 'work in electrical',1 ,'(8-6) pm','https://tse1.mm.bing.net/th?id=OIP.M0TF1T0G9hJWX1wcrXHpgwAAAA&pid=Api&P=0&h=220',52,'Jordan',2),

('Fares', 'Ahmad', 'work in extending water pipes',2 ,'(8-2) pm','https://img.freepik.com/free-photo/man-with-glasses-talking-mobile_1368-7548.jpg',22,'Jordan',2),
('Taha', 'Hameza', 'work in extending water pipes',2 ,'(8-4) pm','https://tse3.mm.bing.net/th?id=OIP.4LYAkrnJAXOdMOuQjZYi9wHaEK&pid=Api&P=0&h=220',34,'Jordan',2),
('Salem', 'Ahmad', 'work in extending water pipes',2 ,'(8-3) pm','https://img.freepik.com/free-photo/man-pointing-right_1187-2601.jpg',21,'Jordan',2),
('Nader', 'SAKER', 'work in extending water pipes',2 ,'(9-5) pm','https://img.freepik.com/free-photo/young-man-looking-camera_155003-8482.jpg',45,'Jordan',2),
('Saleh', 'Ahmad', 'work in extending water pipes',2 ,'(9-12) pm','https://i.pinimg.com/736x/32/68/09/3268099692f758c84f83ec5ad0332d3e.jpg',35,'Jordan',2),
('Malek', 'Ahmad', 'work in extending water pipes',2 ,'(8-6) pm','https://png.pngtree.com/thumb_back/fh260/background/20221221/pngtree-craftsman-standing-mouth-open-open-human-craftsman-photo-image_4727024.jpg',22,'Jordan',2),
('Shuib', 'kaleel', 'work in extending water pipes',2 ,'(5-8) pm','https://tse3.mm.bing.net/th?id=OIP.6ElZNliWK2cAKj0S3CSCDwHaDt&pid=Api&P=0&h=220',53,'Jordan',2),
('kaleel', 'krlar', 'work in extending water pipes',2 ,'(6-10) pm','https://filecache.mediaroom.com/mr5mr_craftsman/177864/56_Eric_Cook_1979_Fairmont-1024x613%20%28400%29.jpg',32,'Jordan',2),
('Ali', 'Rakan', 'work in extending water pipes',2 ,'(6-12) pm','https://tse3.mm.bing.net/th?id=OIP.JM_tdVk1zvbR4LmuvkL8fwHaHa&pid=Api&P=0&h=220',24,'Jordan',2),
('Hussam', 'Foad', 'work in extending water pipes',2 ,'(6-5) pm','https://tse1.mm.bing.net/th?id=OIP.3dFo-1Uy3JbgDGY-1ujyEQHaE6&pid=Api&P=0&h=220',56,'Jordan',2),

('Fares', 'Ahmad', 'work in Construction',3 ,'(7-2) pm','https://tse3.mm.bing.net/th?id=OIP.hk2rxFK8ZiGqViUc7gYKAgAAAA&pid=Api&P=0&h=220',34,'Jordan',2),
('Salem', 'Fares', 'work in Construction',3 ,'(8-2) pm','https://tse3.mm.bing.net/th?id=OIP.O0Cwcu8ooyHjeg79MVtl8QAAAA&pid=Api&P=0&h=220',32,'Jordan',2),
('Lafee', 'Hameza', 'work in Construction',3 ,'(7-2) pm','https://tse1.mm.bing.net/th?id=OIP.WqfTQ3dxKEuOLAY4vUYolQHaMX&pid=Api&P=0&h=220',43,'Jordan',2),
('Foad', 'Shuib', 'work in Construction',3 ,'(8-2) pm','https://thumbs.dreamstime.com/b/man-hammer-wild-men-big-helmet-35247687.jpg',43,'Jordan',2),
('kaleel', 'Ahmad', 'work in Construction',3 ,'(9-2) pm','https://tse4.mm.bing.net/th?id=OIP.ZJMoJ8jX9myjtUzKRKKPagHaHa&pid=Api&P=0&h=220',22,'Jordan',2),
('Fares', 'momen', 'work in Construction',3 ,'(8-6) pm','https://images.saymedia-content.com/.image/t_share/MTc2MjcwNDg1MzU1NjM1OTAy/100-tools-every-handyman-needs.jpg',55,'Jordan',2),
('Saleh', 'Mohamed', 'work in Construction3',3 ,'(9-5) pm','https://thumbs.dreamstime.com/z/carpenter-sanding-guitar-neck-wood-workshop-craftsman-using-paper-hard-working-man-tattoo-beard-working-63018085.jpg',34,'Jordan',2),
('Rakan', 'Ahmad', 'work in Construction',3 ,'(4-8) pm','https://t4.ftcdn.net/jpg/01/13/32/61/360_F_113326199_I726x7J538B26a7XnVHLj8tCYRFGZCCi.jpg',53,'Jordan',2),
('Qtada', 'Saleh', 'work in Construction',3 ,'(4-12) pm','https://blog.innovatebuildingsolutions.com/wp-content/uploads/2017/05/A-craftsman-will-take-pride-in-his-work.png',23,'Jordan',2),
('Issa', 'Ahmad', 'work in Construction',3 ,'(5-7) pm','https://thumbs.dreamstime.com/z/male-craftsman-holding-laptop-happy-over-white-background-53198279.jpg',25,'Jordan',2),
('Shuib', 'Ahmad', 'work in Construction',3 ,'(5-8) pm','https://ak.picdn.net/offset/photos/55252af65a10fc50d2d0854f/large_w/offset_208017.jpg',35,'Jordan',2),

('Fares', 'Ahmad', 'work in plumbing',4 ,'(7-2) pm','https://handmade-business.com/wp-content/uploads/2013/10/photo-1.jpg',34,'Jordan',2),
('Salem', 'Fares', 'work in plumbing',4 ,'(8-2) pm','https://thumbs.dreamstime.com/z/smiling-bearded-craftsman-his-woodwork-studio-portrait-rugged-beard-wearing-checked-shirt-standing-wooden-67423591.jpg',32,'Jordan',2),
('Lafee', 'Hameza', 'work in plumbing',4 ,'(7-2) pm','https://www.thesawguy.com/wp-content/uploads/2019/08/craftsman-miter-saw.jpg',43,'Jordan',2),
('Foad', 'Shuib', 'work in plumbing',4 ,'(8-2) pm','https://thumbs.dreamstime.com/b/repairman-tools-20095757.jpg',43,'Jordan',2),
('kaleel', 'Ahmad', 'work in plumbing',4 ,'(9-2) pm','https://thumbs.dreamstime.com/b/builder-man-carrying-wood-plank-27794307.jpg',22,'Jordan',2),
('Fares', 'momen', 'work in plumbing',4 ,'(8-6) pm','https://www.gannett-cdn.com/-mm-/5f7868aef0651d654c496e35955ff3e67f331d51/c=144-0-2448-1728&r=x404&c=534x401/local/-/media/DetroitNews/2014/10/02/ericshop.jpg',55,'Jordan',2),
('Saleh', 'Mohamed', 'work in plumbing',4 ,'(9-5) pm','https://i.pinimg.com/originals/92/46/ec/9246ecdfff821f68b7a92456bf6a3f12.jpg',34,'Jordan',2),
('Rakan', 'Ahmad', 'work in plumbing',4 ,'(4-8) pm','https://i.pinimg.com/originals/92/46/ec/9246ecdfff821f68b7a92456bf6a3f12.jpg',53,'Jordan',2),
('Qtada', 'Saleh', 'work in plumbing',4 ,'(4-12) pm','https://i.pinimg.com/originals/92/46/ec/9246ecdfff821f68b7a92456bf6a3f12.jpg',23,'Jordan',2),
('Issa', 'Ahmad', 'work in plumbing',4 ,'(5-7) pm','https://i.pinimg.com/originals/92/46/ec/9246ecdfff821f68b7a92456bf6a3f12.jpg',25,'Jordan',2),
('Shuib', 'Ahmad', 'work in plumbing',4 ,'(5-8) pm','https://i.pinimg.com/originals/92/46/ec/9246ecdfff821f68b7a92456bf6a3f12.jpg',35,'Jordan',2);


                    
