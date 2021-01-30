const route = require('express').Router()
const connection = require('../sqldb').connection
route.get('/:User_ID', (req, res) => {
    const query = `select * 
    from (SELECT * FROM orders WHERE User_ID = ?) X
    INNER JOIN products
    ON products.Product_ID = X.Product_ID
    WHERE order_date >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY
    AND order_date < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY
    ORDER BY order_date DESC
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
                    'SELECT COUNT(*) FROM orders WHERE User_ID = ?',
                    [req.params.User_ID],
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

route.get('/all', (req, res) => {
    connection.query(
        'Select * from orders where status <> Delivered',
        function(err, data){
            res.json(data || err)
        }
    )
})

route.patch('/', (req, res) => {
    const query = `UPDATE orders SET status = ?, delivery_date = STR_TO_DATE(?, "%M %d %Y") WHERE OrderId = ? and Product_ID = ?`
    connection.query(
        query,
        [req.body.status, req.body.delivery_date, req.body.OrderId, req.body.Product_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

exports = module.exports = { route }