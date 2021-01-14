const route = require('express').Router()
const connection = require('../sqldb').connection

route.post('/', (req, res) => {
    const query = `insert into products
            (product_name, product_price, qty_kilos,qty_dozen, expiry_date, product_image, discount)
            VALUE ( ?, ?, ?, ?,STR_TO_DATE(?, "%M %D %Y"), ?, ?);`
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
    const query2 = `SELECT * FROM products where Product_ID = ?;`
    let offset = (parseInt(req.query.pageno) - 1) * 20
    if (req.body.Product_ID) {
        connection.query(
            query2,
            [req.body.Product_ID],
            function (err, results) {
                if(results){
                    const resBody = {
                        totalItems: results.length,
                        products: results
                    }
                    res.status(200).json(resBody);
                }else{
                    res.status(400).json(err);
                }
            }
        )
    } else if (req.query.pageno) {
        connection.query(
            query1,
            [offset, 20],
            function (err, results) {
                if(results){
                    const resBody = {
                        totalItems: results.length,
                        products: results
                    }
                    res.status(200).json(resBody);
                }else{
                    res.status(400).json(err);
                }
            }
        )
    }

})

route.patch('/', (req, res) => {
    const query = `UPDATE products
            set product_name = ?,
            product_price = ?,
            qty_kilos = ?,
            qty_dozen = ?,
            expiry_date = STR_TO_DATE(?, "%M %D %Y"),
            product_image = ?,
            discount = ?
            WHERE Product_ID = ?`
    connection.query(
        query,
        [req.body.product_name, req.body.product_price, req.body.qty_kilos, req.body.qty_dozen, req.body.expiry_date, req.body.product_image, req.body.discount, req.body.Product_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

route.delete('/?product_ID', (req, res) => {
    const query = 'DELETE FROM `products` WHERE Product_ID = ?'
    connection.query(
        query,
        [req.body.Product_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

exports = module.exports = { route }