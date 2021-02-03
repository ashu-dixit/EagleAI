const route = require('express').Router()
const connection = require('../sqldb').connection
const authcheck = require('./authmiddleware').authcheck

route.get('/', (req, res) => {
    const city = req.query.city ? req.query.city : ""
    const name = req.query.name ? req.query.name : ""
    const query = 'select * from product where product_name like ? and Vendor_ID in (Select Vendor_ID from user where city like ?)'
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

route.get('/store', authcheck,   (req, res) => {
    const name = req.query.name ? req.query.name : ""
    console.log(res.locals.user + "ashu");
    const query = 'select * from product where product_name like ? and Vendor_ID = ?'
    connection.query(
        query,
        ['%' + name + '%', res.locals.user.User_ID],
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