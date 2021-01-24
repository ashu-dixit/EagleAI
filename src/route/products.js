const route = require('express').Router()
const connection = require('../sqldb').connection

route.post('/', (req, res) => {
    const query = `INSERT INTO 
                products (product_name, product_price, qty_kilos,qty_dozen, expiry_date, product_image, discount) 
                VALUE (?, ?, ?, ?, STR_TO_DATE(?, "%M %d %Y"), ?, ?);`
    connection.query(
        query,
        [req.body.product_name, req.body.product_price, req.body.qty_kilos, req.body.qty_dozen, req.body.expiry_date, req.body.product_image, req.body.discount],
        function (err, results) {
            res.send(results || err)
        }
    )
})
route.get('/', (req, res) => {
    const query1 = `SELECT * FROM products limit ?, ?;`
    const query2 = `SELECT * FROM products where Vendor_ID = ?;`
    let offset = (parseInt(req.query.pageno) - 1) * 10
    if (req.body.Vendor_ID) {
        connection.query(
            query2,
            [req.body.Product_ID],
            function (err, results) {
                if(results){
                    res.status(200).json(results);
                }else{
                    res.status(400).json(err);
                }
            }
        )
    } else if (req.query.pageno) {
        connection.query(
            query1,
            [offset, 10],
            function (err, results) {
                if(results){
                    connection.query(
                        'SELECT COUNT(*) As items FROM products',
                        function (err, totalItems) {
                            if (totalItems) {
                                const resbody = {
                                    totalItems: totalItems[0]["items"],
                                    products: results
                                }
                                res.status(200).json(resbody);
                            } else {
                                res.status(400).json({ message: err });
                            }
                        }
                    )
                }else{
                    res.status(400).json(err);
                }
            }
        )
    }

})

route.patch('/', (req, res) => {
    const query = `UPDATE products set Vendor_ID = ?, product_name = ?, product_price = ?, qty_kilos = ?, qty_dozen = ?, expiry_date =  STR_TO_DATE(?, "%M %d %Y"), product_image = ?, discount = ? WHERE Product_ID = ?;`
    connection.query(
        query,
        [req.body.Vendor_ID, req.body.product_name, req.body.product_price, req.body.qty_kilos, req.body.qty_dozen, req.body.expiry_date, req.body.product_image, req.body.discount, req.body.Product_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

route.delete('/', (req, res) => {
    const query = 'DELETE FROM `products` WHERE Product_ID = ?'
    connection.query(
        query,
        [req.body.Product_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
    connection.query(
        query,
        [req.body.Product_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

exports = module.exports = { route }