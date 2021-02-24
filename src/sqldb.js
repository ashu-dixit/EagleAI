const mysql = require('mysql2');
const db = require('../config').db
// create the connection to database
const connection = mysql.createConnection({
  host: db.DB_HOST,
  user: db.DB_USER,
  database: db.DB_DATABASE,
  password: db.DB_PASS,
});

var queries = []
queries.push(`create table IF NOT EXISTS user (
  User_ID INT NOT NULL AUTO_INCREMENT,
  Name varchar(100),
  MobNo1 varchar(50) NOT NULL,
  MobNo2 varchar(50),
  Address varchar(100),
  VERIFIED boolean,
  City varchar(100),
  LastLogin datetime,
  deposit INT,
  Shop_Owner_name varchar(50),
  ShopGstno varchar(50),
  ShopPhoneno varchar(50),
  Shop_name varchar(100),
  latitudes varchar(50),
  longitude varchar(50),
  Isvendor boolean,
  Isadmin boolean,
  UNIQUE (MobNo1),
  PRIMARY KEY (User_ID)
)`)

queries.push(
  `Create table IF NOT EXISTS product (
    Product_ID INT NOT NULL auto_increment,
    Vendor_ID INT NOT NULL,
    product_name varchar(100),
    product_price varchar(100),
    max_product_qty INT Not NULL,
    expiry_date datetime not null,
    product_image VARCHAR(2083),
    discount float not null,
    disabled boolean NOT NULL,
    category varchar(50),
    PRIMARY KEY (Product_ID)
)`)
queries.push(
  `Create table IF NOT EXISTs cart (
    User_ID INT NOT NULL,
    Product_ID INT NOT Null,
    product_qty INT NOT NULL, 
    primary key(Product_ID, User_ID)
)`)

queries.push(
  `Create table IF NOT EXISTS orders (
    orderID VARCHAR(50) NOT NULL,
    User_ID INT NOT NULL,
    Product_ID BIGINT NOT NULL,
    product_qty INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    delivery_date DATETIME NOT NULL,
    order_date DATETIME NOT NULL,
    PRIMARY KEY (orderID, User_ID, Product_ID)
)`
)
queries.push(
  `Create table IF NOT EXISTS transaction(
    id BIGINT NOT NULL AUTO_INCREMENT, 
    orderID VARCHAR(50) NOT NULL,
    payment_ID VARCHAR(50), 
    type VARCHAR(50),
    mode VARCHAR(50),
    status VARCHAR(50) default 'Failed',  
    PRIMARY KEY (id)
  )`
)
queries.push(
  `CREATE TABLE IF NOT EXISTS notification(
    id INT NOT NULL AUTO_INCREMENT,
    User_ID INT NOT NULL,
    message VARCHAR(100),
    ondate DATETIME,
    PRIMARY KEY (id)
  )`
)
queries.push(`drop trigger if exists notification_trigger`)
queries.push(
  `CREATE TRIGGER notification_trigger 
  AFTER INSERT ON orders
  FOR EACH ROW
  BEGIN
    INSERT INTO notification (message, User_ID, date) VALUES (CONCAT('Hi, You recieved a new order for product ', NEW.product_ID), NEW.User_ID, curdate());
  END`
)

try {
  connection.beginTransaction(function (err, res) {
    const queryPromise = []
    queries.forEach((query, index) => {
      queryPromise.push(connection.query(query))
    })
    connection.commit(function (err, res) {
      console.log(res);
    })
    console.log(queryPromise);
  }
  )
} catch (err) {
  connection.rollback(function (err, res) {
    console.log(res);
  })
}

exports = module.exports = { connection }