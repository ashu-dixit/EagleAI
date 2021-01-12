const express = require('express');
const path = require('path')
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'eagleadmin',
    database: 'eagletech',
    password: 'Eagletech@1'
});
// P0RI_FQ{kYJ|]&Wd
connection.query(
    `create table IF NOT EXISTS vendors (
        Vendor_ID INT NOT NULL AUTO_INCREMENT,
        Name varchar(100) NOT NULL,
        MobNo1 varchar(50) NOT NULL,
        MobNo2 varchar(50) ,
        Address varchar(100) NOT NULL,
        VERIFIED boolean NOT NULL,
        City varchar(100) NOT NULL,
        LastLogin datetime ,
        PRIMARY KEY (VENDOR_ID)
    )`,
    function (err, result) {
        console.log(result);
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
        product_image varchar(100),
        discount float not null,
        PRIMARY KEY (Product_ID)
    )`,
    function (err, result) {
        console.log(result);
    }
)
connection.query(
    `Create table IF NOT EXISTs carts (
        Vendor_ID INT NOT NULL,
        Product_ID INT NOT Null,
        product_qty INT NOT NULL, 
        primary key(Product_ID, Vendor_ID),
        foreign key(Product_ID) references Products(Product_ID),
        foreign key(Vendor_ID) references vendors(Vendor_ID)
    )`,
    function (err, result) {
        console.log(result);
    }
)
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//refering to our static app in public folder
app.use('/', express.static(path.join(__dirname, 'public')));

app.post('/cart', (req, res) => {
    const query1 = `SELECT qty_dozen from Products where Product_ID = ?`
    product_qty = 0;
    connection.query(
        query1,
        [req.body.Product_ID],
        function (err, results) {
            // console.log(results[0].qty_dozen);
            product_qty = parseInt(results[0].Product_ID)
        }
    )
    if (req.body.action == 'add') {
        const query = 'INSERT INTO `Carts` (`Vendor_ID`, `Product_ID`, `product_qty`) values (?,?,?)'
        if (product_qty < req.body.product_qty && req.body.isforced == 0) {
            res.send("The quantity is not available at moment are you sure you want to continue")
        } else {
            connection.query(
                query,
                [req.body.Vendor_ID, req.body.Product_ID, req.body.product_qty],
                function (err, results) {
                    res.send(results)
                    console.log(results);
                }
            )
        }
    } else if (req.body.action == 'delete') {
        const query = 'DELETE FROM `Carts` WHERE Vendor_ID = ? AND Product_ID = ?'
        connection.query(
            query,
            [req.body.Vendor_ID, req.body.Product_ID],
            function (err, results, fields) {
                res.send(results)
            }
        )
    }else if(req.body.action == 'update'){
        const query = `UPDATE Carts set product_qty = ? WHERE Vendor_ID = ? AND Product_ID = ?`
        console.log(product_qty);
        if (product_qty < req.body.product_qty && req.body.isforced == 0) {
            res.send("The quantity is not available at moment are you sure you want to continue")
        } else {
            connection.query(
                query,
                [req.body.product_qty, req.body.Vendor_ID, req.body.Product_ID],
                function (err, results) {
                    res.send(results)
                    console.log(results);
                }
            )
        }
    }
})

app.get('/cart', (req, res) => {
    const query1 = `
    DROP PROCEDURE IF EXISTS getCart;
    delimiter |
    CREATE PROCEDURE getCart(Vendor_ID INT)
    BEGIN
    DECLARE Product_List_isdone BOOLEAN DEFAULT FALSE;
    DECLARE cur_Product_ID INT;
    
    DECLARE product_List CURSOR FOR
        SELECT Product_ID from Carts where Vendor_ID = @Vendor_ID;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET Product_List_isdone = TRUE;
    
    OPEN product_List;
    
    loop_List: LOOP
        FETCH NEXT FROM product_List INTO cur_Product_ID;
        IF Product_List_isdone THEN
            LEAVE loop_List;
        END IF;
        SELECT * FROM products WHERE products.Product_ID = cur_Product_ID;
    END LOOP loop_List;
    CLOSE product_List;
    END
    // DELIMITER ;
    `
    const query = 'SELECT * FROM Carts WHERE  Vendor_ID = ?'
    connection.query(
        query,
        [req.body.Vendor_ID],
        function (err, results, fields) {
            res.send(results);
        }
    )
})
app.listen(3000, () => console.log("Hello"));