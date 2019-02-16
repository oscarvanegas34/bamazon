-- This code will drop the database if it was already created

DROP DATABASE IF EXISTS bamazon_db;

-- This code will create a database with a name bamazon_db

CREATE DATABASE bamazon_db;

-- This code is telling MYSQL to use the bamazon_db

USE bamazon_db;

-- The code below creates the table called products with the following columns: item_id, product_name, department_name, price and stock_quantity. Also, the primary key is item_id and auto increment everytime a new record is created.

CREATE TABLE products (
  item_id INT,
  product_name VARCHAR(400) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT (100) NULL,
   PRIMARY KEY (item_id)
);