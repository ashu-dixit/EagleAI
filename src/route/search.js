const route = require('express').Router()
const connection = require('../sqldb').connection

route.get('/', (req, res) => {
    const query = 'select * from product where product_name like ???'
    connection.query(
        query,
        ['%', req.query.q, '%'],
        function (err, results) {
            res.json(results || err);
        }
    )
})
exports = module.exports = { route }