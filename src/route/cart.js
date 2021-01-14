const route = require('express').Router()
const connection = require('../sqldb').connection

route.post('/', (req, res) => {
    const query = 'INSERT INTO `carts` (`Vendor_ID`, `Product_ID`, `product_qty`) values (?,?,?)'
    connection.query(
        query,
        [req.body.Vendor_ID, req.body.Product_ID, req.body.product_qty],
        function (err, results) {
            if (results) {
                res.send("product Updated successfully")
            } else {
                const resbody = {
                    error: err
                }
                res.status(400).json(resbody)
            }
        }
    )
})

route.put('/', (req, res) => {
    const query = `UPDATE carts set product_qty = ? WHERE Vendor_ID = ? AND Product_ID = ?`
    connection.query(
        query,
        [req.body.product_qty, req.body.Vendor_ID, req.body.Product_ID],
        function (err, results) {
            res.status(200).json(results)
        }
    )
})
route.delete('/', (req, res) => {
    const query = 'DELETE FROM `carts` WHERE Vendor_ID = ? AND Product_ID = ?'
    connection.query(
        query,
        [req.body.Vendor_ID, req.body.Product_ID],
        function (err, results) {
            res.send(results || err)
        }
    )
})


route.get('/:Vendor_id', (req, res) => {
    const query = `SELECT *
    FROM (SELECT * FROM carts WHERE Vendor_ID = ?) X
    INNER JOIN products
    ON products.Product_ID = X.Product_ID;`
    connection.query(
        query,
        [req.params.Vendor_id],
        function (err, results) {
            if (results) {
                const resbody = {
                    totalItems: results.length,
                    cart: results
                }
                res.status(200).json(resbody);
            } else {
                res.status(400).json(err);
            }
        }
    )
})

exports = module.exports = { route }