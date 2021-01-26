const route = require('express').Router()
const connection = require('../sqldb').connection

route.post('/', (req, res) => {
    const query = 'INSERT INTO `carts` (`User_ID`, `Product_ID`, `product_qty`) values (?,?,?)'
    connection.query(
        query,
        [req.body.User_ID, req.body.Product_ID, req.body.product_qty],
        function (err, results) {
            if (results) {
                res.send(results)
            } else {
                const resbody = {
                    error: err
                }
                res.status(400).json(resbody)
            }
        }
    )
})

route.patch('/', (req, res) => {
    const query = `UPDATE carts set product_qty = ? WHERE User_ID = ? AND Product_ID = ?`
    connection.query(
        query,
        [req.body.product_qty, req.body.User_ID, req.body.Product_ID],
        function (err, results) {
            res.status(200).json(results)
        }
    )
})
route.delete('/', (req, res) => {
    const query = 'DELETE FROM `carts` WHERE User_ID = ? AND Product_ID = ?'
    connection.query(
        query,
        [req.body.User_ID, req.body.Product_ID],
        function (err, results) {
            res.send(results || err)
        }
    )
})

route.get('/:User_ID', (req, res) => {
    const query = `SELECT *
    FROM (SELECT * FROM carts WHERE User_ID = ?) X
    INNER JOIN products
    ON products.Product_ID = X.Product_ID
    Limit ?, ?;`
    let offset = (parseInt(req.query.pageno) - 1) * 10
    connection.query(
        query,
        [req.params.User_ID, offset, 10],
        function (err, results) {
            if (results) {
                var price = 0;
                results.forEach(element => {
                    price += (element.product_qty * element.product_price);
                });
                connection.query(
                    'SELECT COUNT(*) FROM carts WHERE User_ID = ?',
                    [req.params.User_ID],
                    function (err, totalItems) {
                        if (totalItems) {
                            const resbody = {
                                totalItems: totalItems[0]['COUNT(*)'],
                                totalprice: price,
                                cart: results
                            }
                            res.status(200).json(resbody);
                        } else {
                            res.status(400).json({ message: err });
                        }
                    }
                )
            } else {
                res.status(400).json({ message: err });
            }
        }
    )
})

exports = module.exports = { route }