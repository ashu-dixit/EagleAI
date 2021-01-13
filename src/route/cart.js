const route = require('express').Router()
const connection = require('../sqldb').connection

route.post('/', (req, res) => {
    const query = 'INSERT INTO `carts` (`Vendor_ID`, `Product_ID`, `product_qty`) values (?,?,?)'
    connection.query(
        query,
        [req.body.Vendor_ID, req.body.Product_ID, req.body.product_qty],
        function (err, results) {
            res.send(results || err)
        }
    )
})

route.put('/', (req, res) => {
    const query = `UPDATE carts set product_qty = ? WHERE Vendor_ID = ? AND Product_ID = ?`
    connection.query(
        query,
        [req.body.product_qty, req.body.Vendor_ID, req.body.Product_ID],
        function (err, results) {
            res.send(results || err)
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


route.get('/:id', (req, res) => {
    const query = `SELECT *
    FROM (SELECT * FROM carts WHERE Vendor_ID = ?) X
    INNER JOIN products
    ON products.Product_ID = X.Product_ID;`
    connection.query(
        query,
        [req.params.id],
        function (err, results, fields) {
            res.send(results || err);
        }
    )
})

exports = module.exports = { route }