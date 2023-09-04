DROP DATABASE IF EXISTS ecommerce_shop;
CREATE DATABASE ecommerce_shop;
USE ecommerce_shop;
SHOW DATABASES;

CREATE TABLE `user`(
	user_id INT UNSIGNED,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE product(
    user_id INT UNSIGNED,
	product_id INT UNSIGNED,
    product_name VARCHAR(20) UNIQUE NOT NULL,
    product_image VARCHAR(255),
    PRIMARY KEY(product_id),
    FOREIGN KEY(user_id) REFERENCES `user`(user_id)
);

CREATE TABLE `order`(
    product_id INT UNSIGNED,
	order_id INT UNSIGNED,
    order_qty INT UNSIGNED,
    PRIMARY KEY(order_id),
    FOREIGN KEY(product_id) REFERENCES product(product_id)
);

SHOW TABLES;
DESC `user`;
DESC product;
DESC `order`;

INSERT INTO `user`(user_id, username, password)
VALUES(1, "admin", "admin");
INSERT INTO `user`(user_id, username, password)
VALUES(2, "customer", "customer");

INSERT INTO product(product_id, product_name, product_image)
VALUES(1, "dog", "./images/toshi-K5pLGYJMHKk-unsplash.jpg");

INSERT INTO `order`(order_id, product_id, order_qty)
VALUES(1, 1, 1);

SELECT * FROM `user`;
SELECT * FROM product;
SELECT * FROM `order`;