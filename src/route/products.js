const route = require('express').Router()
const connection = require('../sqldb').connection
route.post('/', (req, res) => {
    const query = `INSERT INTO product (Vendor_ID, product_name, product_price, max_product_qty, expiry_date, product_image, discount, category, disabled) VALUE (?, ?, ?, ?, STR_TO_DATE(?, "%M %d %Y"), ?, ?, ?, ?);`
    connection.query(
        query,
        [res.locals.user.User_ID, req.body.product_name, req.body.product_price, req.body.max_product_qty, req.body.expiry_date, req.body.product_image, req.body.discount, req.body.category, 0],
        function (err, results) {
            res.send(results || err)
        }
    )
})
route.get('/store', (req, res) => {
    const query2 = `SELECT * FROM product where Vendor_ID = ? and disabled = 0 limit ?, ?;`
    let offset = (parseInt(req.query.pageno) - 1) * 10
    console.log(res.locals.user.User_ID )
    connection.query(
        query2,
        [res.locals.user.User_ID, offset, 10],
        function (err, results) {
            if (results) {
                connection.query(
                    'SELECT COUNT(*) As items FROM product where Vendor_ID = ? and disabled = False',
                    [res.locals.user.User_ID],
                    function (err, totalItems) {
                        if (totalItems) {
                            connection.query(
                                `select deposit, VERIFIED from user where User_ID = ?`,
                                [res.locals.user.User_ID],
                                function (err, user_detail) {
                                    const resbody = {
                                        wallet: user_detail[0].deposit,
                                        VERIFIED: user_detail[0].VERIFIED,
                                        totalItems: totalItems[0]["items"],
                                        products: results
                                    }
                                    res.status(200).json(resbody);
                                }
                            )
                        } else {
                            res.status(400).json({ message: err });
                        }
                    }
                )
            } else {
                res.status(400).json(err);
            }
        }
    )
})
route.get('/', (req, res) => {
    const query1 = `SELECT * FROM product where Vendor_ID <> ? limit ?, ?;`
    console.log(res.locals.user)
    let offset = (parseInt(req.query.pageno) - 1) * 10
    if (req.query.pageno) {
        connection.query(
            query1,
            [res.locals.user.User_ID, offset, 10],
            function (err, results) {
                if (results) {
                    connection.query(
                        'SELECT COUNT(*) As items FROM product where Vendor_ID <> ?',
                        [res.locals.user.User_ID],
                        function (err, totalItems) {
                            if (totalItems) {
                                const resbody = {
                                    totalItems: totalItems[0]["items"],
                                    products: results
                                }
                                res.status(200).json(resbody);
                            } else {
                                res.status(400).json({ message: err });
                            }
                        }
                    )
                } else {
                    res.status(400).json(err);
                }
            }
        )
    }

})

route.patch('/', (req, res) => {
    const query = `UPDATE product set product_name = ?, product_price = ?, max_product_qty = ?, expiry_date =  STR_TO_DATE(?, "%M %d %Y"), product_image = ?, discount = ?, category = ? WHERE Product_ID = ? AND Vendor_ID = ?;`
    connection.query(
        query,
        [req.body.product_name, req.body.product_price, req.body.max_product_qty, req.body.expiry_date, req.body.product_image, req.body.discount, req.body.category,  req.body.Product_ID, res.locals.user.User_ID,],
        function (err, results) {
            res.send(results || err);
        }
    )
})

route.delete('/', (req, res) => {
    const query = 'Update product set disabled = 1 WHERE Product_ID = ? && Vendor_ID = ?'
    connection.query(
        query,
        [req.body.Product_ID, res.locals.user.User_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

exports = module.exports = { route }