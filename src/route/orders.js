const route = require('express').Router()
const connection = require('../sqldb').connection
route.get('/', (req, res) => {
    const query = `select * 
    from (SELECT * FROM orders WHERE User_ID = ?) X
    INNER JOIN products
    ON products.Product_ID = X.Product_ID
    WHERE order_date >= curdate() - INTERVAL DAYOFWEEK(curdate()) + ? DAY
    AND order_date <= curdate()
    ORDER BY order_date DESC
    Limit ?, ?;`
    let offset = (parseInt(req.query.pageno) - 1) * 10
    connection.query(
        query,
        [res.locals.user.User_ID, days, offset, 10],
        function (err, results) {
            if (results) {
                var price = 0;
                results.forEach(element => {
                    price += (element.product_qty * element.product_price);
                });
                connection.query(
                    'SELECT COUNT(*) FROM orders WHERE User_ID = ?',
                    [req.locals.User_ID],
                    function (err, totalItems) {
                        if (totalItems) {
                            const resbody = {
                                totalItems: totalItems[0]['COUNT(*)'],
                                totalprice: price,
                                orders: results
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