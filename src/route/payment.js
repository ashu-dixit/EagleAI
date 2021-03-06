const route = require('express').Router()
const shortid = require('shortid')
const Razorpay = require('razorpay')
const razorpaykey = require('../../config').Razorpay
const { connection } = require('../sqldb')
const { authcheck } = require('./authmiddleware')

const razorpay = new Razorpay({
    key_id: razorpaykey.key_id,
    key_secret: razorpaykey.key_secret
})

route.post('/verification', (req, res) => {
    // do a validation
    const secret = razorpaykey.secret

    console.log(req.body)

    const crypto = require('crypto')

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']) {

        console.log(req.body.payload.payment.entity)
        connection.query(
            'select User_ID from order where orderID = ?',
            [req.body.payload.payment.entity.order_id],
            function (err, user) {
                var queries = []
                var queryValues = []
                queries.push(`INSERT INTO transaction (OrderID, payment_ID, type, mode, status) VALUE (?,?,?,?,?)`)
                queryValues.push([req.body.payload.payment.entity.order_id, req.body.payload.payment.entity.id, req.body.payload.payment.entity.method, 'Debit', 'Success'])

                queries.push(`UPDATE order SET status = 'Pending' WHERE orderId = ?`)
                queryValues.push([req.body.payload.payment.entity.order_id])

                queries.push(`delete from cart where User_ID = ?`)
                queryValues.push([user[0]['User_ID']])

                queries.push('UPDATE product JOIN cart USING (product_ID) SET product.max_product_qty = product.max_product_qty - cart.product_qty WHERE cart.User_ID = ?')
                queryValues.push([user[0]['User_ID']])


                try {
                    connection.beginTransaction(function (err, res) {
                        const queryPromise = []
                        queries.forEach((query, index) => {
                            queryPromise.push(connection.query(query, queryValues[index]))
                        })
                        connection.commit(function (err, res) {
                            if (res) {
                                res.json({ status: 'ok' })
                            } else {
                                res.json({
                                    message: 'Failed Transaction'
                                })
                            }

                        })
                    })
                } catch (err) {
                    connection.rollback(function (err, res) {
                        connection.query(
                            'INSERT INTO transaction (OrderID, payment_ID, type, mode, status) VALUE (?,?,?,?,?)',
                            [req.body.payload.payment.entity.order_id, req.body.payload.payment.entity.id, req.body.payload.payment.entity.method, 'Debit', 'Failed'],
                            function (error, respons) {
                                res.json({ message: err })
                            }
                        )
                    })
                }
            }
        )
    } else {

        var queries = []
        var queryValues = []

        queries.push(`DELETE FROM order where orderId = ?`)
        queryValues.push([req.body.payload.payment.entity.order_id])

        queries.push(`DELETE FROM order_item where orderId = ?`)
        queryValues.push([req.body.payload.payment.entity.order_id])

        queries.push('INSERT INTO transaction (OrderID, payment_ID, type, mode, status) VALUE (?,?,?,?,?)')
        queryValues.push([req.body.payload.payment.entity.order_id, req.body.payload.payment.entity.id, req.body.payload.payment.entity.method, 'Debit', 'Failed'])

        try {
            connection.beginTransaction(function (err, resu) {
                const queryPromise = []
                queries.forEach((query, index) => {
                    queryPromise.push(connection.query(query, queryValues[index]))
                })

                connection.commit(function (err, result) {
                    console.log(err);
                    res.json({ status: 'ok' })
                })
            })
        } catch (err) {
            connection.rollback(function (err, result) {
                res.json({ status: 'ok' })
            })
        }
    }
})

route.post('/verify', (req, res) => {
    // do a validation
    const query = `SELECT status FROM transaction WHERE OrderID = ?`
    connection.query(
        query,
        [req.body.orderId],
        function (err, results) {
            if (err != null && results.length === 0) {
                res.json({ status: 'Failed' })
            } else {
                res.json(results[0] || err)
            }
        }
    )
})

route.post('/razorpay', authcheck, async (req, res) => {
    const payment_capture = 1
    const options = {
        amount: parseInt(req.body.grandTotal) * 100,
        currency: req.body.currency,
        receipt: shortid.generate(),
        payment_capture
    }
    const usewallet = req.body.usewallet;
    connection.query(
        'SELECT Product_name, Product_ID from product join cart using(Product_ID) where user_ID = ? AND cart.product_qty > product.max_product_qty',
        [res.locals.user.User_ID],
        function (err, re) {
            if (re.length != 0) {
                res.json({ message: "qty not available", products: re })
            }
        }
    )
    // select SUM(product_qty*product_price) AS granTotal from product INNER JOIN (SELECT * CART where user_ID = ?) AS C Using Product_ID
    if (req.body.usewallet == 1) {
        connection.query(
            `select deposit from user where User_ID = ?`,
            [res.locals.user.User_ID],
            function (err, amount) {
                console.log(amount[0]['deposit'])
                if (amount[0]['deposit'] > req.body.grandTotal) {
                    var firstDay = new Date();
                    var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
                    var order_id = shortid.generate()
                    var queries = []
                    var queryValues = []

                    queries.push(`INSERT INTO \`order\` (orderId, User_ID, status, delivery_date, order_date) VALUE (?, ?, ?, DATE(?), DATE(?))`)
                    queryValues.push([order_id, res.locals.user.User_ID, `Pending`, nextWeek, firstDay])

                    queries.push(`INSERT INTO order_item (orderId, Product_ID, Product_qty) SELECT ?, product_ID, product_qty from cart where User_ID = ?`)
                    queryValues.push([order_id, res.locals.user.User_ID])

                    queries.push(`INSERT INTO transaction (OrderID, payment_ID, type, mode, status) VALUE (?,?,?,?,?)`)
                    queryValues.push([order_id, shortid.generate(), 'Wallet', 'Debit', 'Success'])

                    queries.push('UPDATE product JOIN cart USING (product_ID) SET product.max_product_qty = product.max_product_qty - cart.product_qty WHERE cart.User_ID = ?')
                    queryValues.push([res.locals.user.User_ID])

                    queries.push(`DELETE FROM cart WHERE User_ID = ?`)
                    queryValues.push([res.locals.user.User_ID])

                    queries.push(`UPDATE user SET deposit = ? WHERE User_ID = ?`)
                    queryValues.push([amount[0]['deposit'] - req.body.grandTotal, res.locals.user.User_ID])

                    try {
                        connection.beginTransaction(function (err, resu) {
                            const queryPromise = []
                            queries.forEach((query, index) => {
                                queryPromise.push(connection.query(query, queryValues[index]))
                            })

                            connection.commit(function (err, result) {
                                console.log(err);
                                if (result) {

                                    res.json({
                                        id: order_id,
                                        wallet: true
                                    })
                                } else {
                                    res.json({
                                        message: 'Failed Transaction'
                                    })
                                }
                            })
                        })
                    } catch (err) {
                        connection.rollback(function (err, result) {
                            res.json({
                                message: 'Failed Transaction'
                            })
                        })
                    }
                } else {
                    res.json({ message: "Not enough Balance in wallet" })
                }
            }
        )
    } else {
        try {
            console.log(options);
            const response = await razorpay.orders.create(options)
            var firstDay = new Date();
            var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
            var order_id = response.id
            console.log(nextWeek);
            var queries = []
            var queryValues = []

            queries.push(`INSERT INTO \`order\` (orderId, User_ID, status, delivery_date, order_date) VALUE (?, ?, ?, DATE(?), DATE(?) )`)
            queryValues.push([order_id, res.locals.user.User_ID, `Awaiting Payment`, nextWeek, firstDay])

            queries.push(`INSERT INTO order_item (orderId, Product_ID, Product_qty) SELECT ?, product_ID, product_qty from cart where User_ID = ?`)
            queryValues.push([order_id, res.locals.user.User_ID])

            connection.beginTransaction(function (err, resu) {
                const queryPromise = []
                queries.forEach((query, index) => {
                    queryPromise.push(connection.query(query, queryValues[index]))
                })

                connection.commit(function (err, result) {
                    console.log(err);
                    if (result) {

                        res.json({
                            id: response.id,
                            currency: response.currency,
                            amount: response.amount,
                            response: response,
                        })
                        console.log(results || err);
                    } else {
                        res.json({
                            message: 'Failed Transaction'
                        })
                    }
                })
            })

        } catch (error) {
            connection.rollback(function (err, result) {
                // console.log(err || result)
                res.json({
                    message: 'Failed Transaction'
                })
            })
        }
    }
})


exports = module.exports = { route }