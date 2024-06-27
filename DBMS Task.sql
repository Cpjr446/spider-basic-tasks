create database inventoryDB;
use inventoryDB;
CREATE TABLE products (
  `name` varchar(255) NOT NULL, 
  `description` varchar(255),
  price decimal(10,2),
  quantity int NOT NULL,
  category varchar(255)
);
insert into products ('Headphones', 'Wireless Noise Cancelling Headphones', 2199.99, 10, 'Electronics');
insert into products ('T-Shirt', 'Comfortable Cotton T-Shirt (M)', 399, 25, 'Clothing');
insert into products ('Notebook', 'Ruled Paper Notebook (100 pages)', 105.50, 50, 'Office Supplies');
select * from products;
select * from products where price<500;
select * from products where quantity>30;
update products set price=120 where name="Notebook";
delete from products where name="T-Shirt";