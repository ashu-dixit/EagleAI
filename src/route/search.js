const route = require('express').Router()
const connection = require('../sqldb').connection

route.get('/', (req, res) => {
    const query = 'select * from products where product_name like ?'
    connection.query(
        query,
        ['%' + req.query.q + '%'],
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