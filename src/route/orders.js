const route = require('express').Router()
const connection = require('../sqldb').connection

route.get('/:vendorID', (req, res) => {
    const query = `SELECT * FROM orders where orderId IN (select orderId from orders where vendor_ID = ?)`
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

// route.patch('/', (req, res) => {
//     const query = `UPDATE order SET status = ? WHERE orderId = ? and productID = ?`
//     connection.query(
//         query,
//         [req.body.status, req.body.order_item_id],
//         function (err, results) {
//             res.send(results || err);
//         }
//     )
// })

// route.delete('/', (req, res) => {
//     const query = 'DELETE FROM `order_items` WHERE id = ?'
//     connection.query(
//         query,
//         [req.body.id],
//         function (err, results) {
//             res.send(results || err);
//         }
//     )
// })

exports = module.exports = { route }