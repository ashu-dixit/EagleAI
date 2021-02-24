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
            'select User_ID from orders where orderID = ?',
            [req.body.payload.payment.entity.order_id],
            function (err, user) {
                var queries = []
                var queryValues = []
                queries.push(`INSERT INTO transaction (OrderID, payment_ID, type, mode, status) VALUE (?,?,?,?,?)`)
                queryValues.push([req.body.payload.payment.entity.order_id, req.body.payload.payment.entity.id, req.body.payload.payment.entity.method, 'Debit', 'Success'])

                queries.push(`UPDATE orders SET status = 'Pending' WHERE orderId = ?`)
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


                // const query = `INSERT INTO transaction (OrderID, payment_ID, type, mode, status) VALUE (?,?,?,?,?)`
                // const query2 = `UPDATE orders SET status = 'Awaiting Fulfillment' WHERE orderId = ?`
                // connection.query(
                //     query,
                //     [req.body.payload.payment.entity.order_id, req.body.payload.payment.entity.id, req.body.payload.payment.entity.method, 'Debit', 'Success'],
                //     function (err, results) {
                //         console.log(results || err);
                //     }
                // )
                // connection.query(
                //     `delete from cart where User_ID = ?`,
                //     [user[0]['User_ID']],
                //     function (err, results) {
                //         console.log(results || err);
                //     }
                // )
                // connection.query(
                //     query2,
                //     [req.body.payload.payment.entity.order_id],
                //     function (err, results) {
                //         console.log(results || err);
                //         res.json({ status: 'ok' })
                //     }
                // )
            }
        )
    } else {
        connection.query(
            `delete from orders where orderId = ?`,
            [req.body.payload.payment.entity.order_id],
            function (err, results) {
                console.log(results);
                res.json({ status: 'ok' })
            }
        )
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
    if (usewallet) {
        checkwalet(req, res)
    } else {
        try {
            console.log(options);
            const response = await razorpay.orders.create(options)
            var firstDay = new Date();
            var nextWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
            console.log(nextWeek);
            connection.query(
                `INSERT INTO orders (orderId, User_ID, Product_ID, product_qty, status, delivery_date, order_date) SELECT ?, User_ID,  Product_ID, product_qty, ?, DATE(?), DATE(?) FROM cart WHERE User_ID = ?;`,
                [response.id, `Awaiting Payment`, nextWeek, firstDay, res.locals.user.User_ID],
                function (err, results) {
                    res.json({
                        id: response.id,
                        currency: response.currency,
                        amount: response.amount,
                        response: response,
                    })
                    console.log(results || err);
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
})

function checkwalet(req, res) {
    connection.query(
        `select deposit from user where User_ID = ?`,
        [res.locals.user.User_ID],
        function (err, amount) {
            console.log(amount[0]['deposit'])
            if (amount[0]['deposit'] > req.body.grandTotal) {
                var firstDay = new Date();
                var nextWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
                var order_id = shortid.generate()
                var queries = []
                var queryValues = []
                queries.push(`INSERT INTO orders (orderId, User_ID, Product_ID, product_qty, status, delivery_date, order_date) SELECT ?, User_ID,  Product_ID, product_qty, ?, DATE(?), DATE(?) FROM cart WHERE User_ID = ?;`)
                queryValues.push([order_id, `Pending`, nextWeek, firstDay, res.locals.user.User_ID])

                queries.push(`INSERT INTO transaction (OrderID, payment_ID, type, mode, status) VALUE (?,?,?,?,?)`)
                queryValues.push([order_id, shortid.generate(), 'Wallet', 'Debit', 'Success'])

                queries.push(`delete from cart where User_ID = ?`)
                queryValues.push([res.locals.user.User_ID])

                queries.push(`update user set deposit = ? where User_ID = ?`)
                queryValues.push([amount[0]['deposit'] - req.body.grandTotal, res.locals.user.User_ID])

                queries.push('UPDATE product JOIN cart USING (product_ID) SET product.max_product_qty = product.max_product_qty - cart.product_qty WHERE cart.User_ID = ?')
                queryValues.push([res.locals.user.User_ID])

                try {
                    connection.beginTransaction(function (err, res) {
                        const queryPromise = []
                        queries.forEach((query, index) => {
                            queryPromise.push(connection.query(query, queryValues[index]))
                        })
                        connection.commit(function (err, res) {
                            if (res) {
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
                    connection.rollback(function (err, res) {
                        console.log(err || res)
                    })
                    res.json({
                        message: 'Failed Transaction'
                    })
                }
                // connection.query(
                //     `INSERT INTO orders (orderId, User_ID, Product_ID, product_qty, status, delivery_date, order_date) SELECT ?, User_ID,  Product_ID, product_qty, ?, DATE(?), DATE(?) FROM cart WHERE User_ID = ?;`,
                //     [order_id, `Awaiting Payment`, nextWeek, firstDay, res.locals.user.User_ID],
                //     function (err, results) {
                //         console.log(results || err);
                //     }
                // )
                // const query = `INSERT INTO transaction (OrderID, payment_ID, type, mode, status) VALUE (?,?,?,?,?)`
                // connection.query(
                //     query,
                //     [order_id, shortid.generate(), req.body.type, 'Debit', 'Success'],
                //     function (err, results) {
                //         console.log(results || err);
                //     }
                // )
                // connection.query(
                //     `delete from cart where User_ID = ?`,
                //     [res.locals.user.User_ID],
                //     function (err, results) {
                //         console.log(results || err);
                //     }
                // )
                // const query2 = `UPDATE orders SET status = 'Pending' WHERE orderId = ?`
                // connection.query(
                //     query2,
                //     [order_id],
                //     function (err, results) {
                //         console.log(results || err);
                //     }
                // )
                // connection.beginTransaction
                // connection.query(
                //     `update user set deposit = ? where User_ID = ?`,
                //     [amount[0]['deposit'] - req.body.grandTotal, res.locals.user.User_ID],
                //     function (err, results) {
                //         console.log(results || err);
                //     }
                // )

            } else {
                res.json({ message: "Not enough Balance in wallet" })
            }
        }
    )
}

exports = module.exports = { route }