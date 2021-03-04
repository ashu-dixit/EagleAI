const route = require('express').Router()
const connection = require('../sqldb').connection
route.get('/', (req, res) => {
    const query = `select * FROM \`order\` WHERE order_date <= now() - INTERVAL ? DAY AND order_date >= now() - INTERVAL ? DAY AND User_ID = ? ORDER BY order_date DESC Limit ?, ?`
    let offset = (parseInt(req.query.pageno) - 1) * 10
    connection.query(
        query,
        [req.query.strtday, req.query.endday, res.locals.user.User_ID, offset, 10],
        function (err, orders) {
            console.log(err);
            var orderdetails = [];
            orders.forEach((field, index) => {
                var newfield = new Object(field);
                connection.query(
                    'SELECT * from product where product_ID in (select product_ID from order_item where orderID = ?)',
                    [field.orderID],
                    function (err, products) {
                        newfield.products = products
                        orderdetails.push(newfield)
                        if(index == orders.length - 1){
                            res.json({
                                TotalOrders: orders.length,
                                orders: orderdetails
                            })
                        }
                    }
                    )
                    console.log(orderdetails);
            })
            if(orders.length == 0){
                res.json({
                    TotalOrders: orders.length,
                    orders: orderdetails
                })
            }
        }
    )
})

route.get('/transaction', (req, res) => {
    connection.query(
        'SELECT * transaction where orderID = ?',
        [req.body.orderID],
        function (err, result) {
            res.send(result[0]);
        }
    )
})
exports = module.exports = { route }