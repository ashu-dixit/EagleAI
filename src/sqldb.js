const mysql = require('mysql2');
const db = require('../config').db
// create the connection to database
const connection = mysql.createConnection({
  host: db.DB_HOST,
  user: db.DB_USER,
  database: db.DB_DATABASE,
  password: db.DB_PASS,
});

connection.query(
  `create table IF NOT EXISTS vendors (
      Vendor_ID INT NOT NULL AUTO_INCREMENT,
      Name varchar(100) NOT NULL,
      MobNo1 varchar(50) NOT NULL,
      MobNo2 varchar(50) ,
      Address varchar(100) NOT NULL,
      VERIFIED boolean NOT NULL,
      City varchar(100) NOT NULL,
      LastLogin datetime,
      PRIMARY KEY (VENDOR_ID)
  )`,
  function (err, result) {
    // console.log(result || err);
  }
)
connection.query(
  `Create table IF NOT EXISTS products(
      Product_ID INT NOT NULL auto_increment,
      product_name varchar(100),
      product_price varchar(100),
      qty_kilos INT NOT NULL,
      qty_dozen INT Not NULL,
      expiry_date datetime not null,
      product_image VARCHAR(2083),
      discount float not null,
      PRIMARY KEY (Product_ID)
  )`,
  function (err, result) {
    // console.log(err);
  }
)
connection.query(
  `Create table IF NOT EXISTs carts (
      Vendor_ID INT NOT NULL,
      Product_ID INT NOT Null,
      product_qty INT NOT NULL, 
      primary key(Product_ID, Vendor_ID)
  )`,
  function (err, result) {
    console.log(err);
  }
)

connection.query(
  `Create table IF NOT EXISTS orders(
      orderID VARCHAR(50) NOT NULL,
      Vendor_ID INT NOT NULL,
      product_ID BIGINT NOT NULL,
      status VARCHAR(50) Not NULL,  
      PRIMARY KEY (orderId)
  )`,
  function (err, result) {
    console.log(err);
  }
)
connection.query(
  `Create table IF NOT EXISTS transactions(
    id BIGINT NOT NULL AUTO_INCREMENT, 
    orderID VARCHAR(50) NOT NULL,
    payment_ID VARCHAR(50), 
    type VARCHAR(50),
    mode VARCHAR(50),
    status VARCHAR(50) default 'Failed',  
    PRIMARY KEY (id)
  )`,
  function (err, result) {
    console.log(err);
  }
)
exports = module.exports = { connection }