const route = require('express').Router()
const connection = require('../sqldb').connection

route.post('/', (req, res) => {
    const query = `INSERT INTO 
                orders (Vendor_ID, product_ID, status , price, transaction_ID, order_date) 
                VALUE (?, ?, ?, ?, STR_TO_DATE(?, "%M %d %Y"), ?, ?);`
    connection.query(
        query,
        [req.body.product_name, req.body.product_price, req.body.qty_kilos, req.body.qty_dozen, req.body.expiry_date, req.body.product_image, req.body.discount],
        function (err, results) {
            res.send(results || err)
        }
    )
})
route.get('/:vendorID', (req, res) => {
    const query = `SELECT * FROM order_item where orderId = (select orderId from orders where vendor_ID = ?)`
    connection.query(
        query,
        [req.params.vendorID],
        function (err, results) {
            if (results) {
                res.status(200).json(results);
            } else {
                res.status(400).json(err);
            }
        }
    )

})

route.patch('/', (req, res) => {
    const query = `UPDATE order_item SET status = ? WHERE orderId = (select orderId from orders where vendor_ID = ?);`
    connection.query(
        query,
        [req.body.status, req.body.vendor_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

route.delete('/', (req, res) => {
    const query = 'DELETE FROM `order_items` WHERE id = ?'
    connection.query(
        query,
        [req.body.id],
        function (err, results) {
            res.send(results || err);
        }
    )
})

exports = module.exports = { route }