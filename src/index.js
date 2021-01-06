const express = require('express');
const path = require('path')
// const connection = require('./sqldb')
const mysql = require('mysql2');
const { response } = require('express');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'eagleadmin',
  database: 'eagletech',
  password: 'eagle'
});
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//refering to our static app in public folder
app.use('/',express.static(path.join(__dirname,'public')));

app.post('/cart', (req, res) => {
    if(req.body.action == 'add'){
        const query = 'INSERT INTO `Carts` (`Vendor_ID`, `Product_ID`, `product_qty`) values (?,?,?)'
        connection.query(
            query,
            [req.body.Vendor_ID, req.body.Product_ID, req.body.product_qty],
            function (err, results) {
                res.send(results)
                console.log(results);
            }
        )
    }else if(req.body.action == 'remove'){
        const query = 'DELETE FROM `Carts` WHERE Vendor_ID = ? AND Product_ID = ?'
        connection.query(
            query,
            [req.body.Vendor_ID, req.body.Product_ID],
            function (err, results, fields) {
                response.send(results)
            }
        )
    }
})

app.get('/cart', (req, res) => {
    const query = 'SELECT * FROM Carts WHERE  Vendor_ID = ?'
    connection.query(
        query,
        [req.body.Vendor_ID, req.body.Product_ID],
        function (err, results, fields) {
            res.send(results);
        }
    )
})
app.listen(3000, () => console.log("Hello"));