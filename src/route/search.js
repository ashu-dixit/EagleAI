const route = require('express').Router()
const connection = require('../sqldb').connection

route.get('/', (req, res) => {
    const city = req.query.city ? req.query.city : ""
    const name = req.query.name ? req.query.name : ""
    const query = 'select * from products where product_name like ? and Vendor_ID in (Select Vendor_ID from users where city like ?)'
    connection.query(
        query,
        ['%' + name + '%', '%' + city + '%'],
        function (err, results) {
            if (results) {
                res.json({
                    totalItems: results.length,
                    products: results
                })
            } else {
                res.json(err);
            }
        }
    )
})

route.get('/stock', (req, res) => {
    const name = req.query.name ? req.query.name : ""
    const query = 'select * from products where product_name like ? and Vendor_ID = ?'
    connection.query(
        query,
        ['%' + name + '%', req.body.Vendor_ID],
        function (err, results) {
            if (results) {
                res.json({
                    totalItems: results.length,
                    products: results
                })
            } else {
                res.json(err);
            }
        }
    )
})
exports = module.exports = { route }