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
        const query = `INSERT INTO transactions (OrderID, payment_ID, type, mode, status) VALUE (?,?,?,?,?)`
        const query2 = `UPDATE orders SET status = 'Awaiting Fulfillment' WHERE orderId = ?`
        connection.query(
            query,
            [req.body.payload.payment.entity.order_id, req.body.payload.payment.entity.id, req.body.type, 'Debit', 'Success'],
            function (err, results) {
                console.log(results || err);
            }
        )
        connection.query(
            `delete from carts where User_ID = ?`,
            [req.body.User_ID],
            function (err, results) {
            }
        )
        connection.query(
            query2,
            [req.body.payload.payment.entity.order_id],
            function (err, results) {
                console.log(results || err);
                res.json({ status: 'ok' })
            }
        )
    } else {
        connection.query(
            `delete from orders where orderId = ?`,
            [req.body.payload.payment.entity.order_id],
            function (err, results) {
                console.log(results);
            }
        )
    }
})

route.post('/verify', (req, res) => {
    // do a validation
    const query = `SELECT status FROM transactions WHERE OrderID = ?`
    connection.query(
        query,
        [req.body.orderId],
        function (err, results) {
            if (results.length === 0) {
                res.json({ status: 'Failed' })
            } else {
                res.json(results[0] || err)
            }
        }
    )
})

route.post('/razorpay', checkwalet, authcheck, async (req, res) => {
    const payment_capture = 1
    const options = {
        amount: parseInt(req.body.grandTotal) * 100,
        currency: req.body.currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        console.log(options);
        const response = await razorpay.orders.create(options)
        var firstDay = new Date();
        var nextWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
        console.log(nextWeek);
        connection.query(
            `INSERT INTO orders (orderId, User_ID, Product_ID, product_qty, status, delivery_date, order_date) SELECT ?, User_ID,  Product_ID, product_qty, ?, DATE(?), DATE(?) FROM carts WHERE User_ID = ?;`,
            [response.id, `Awaiting Payment`, nextWeek, firstDay, req.body.User_ID],
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
})

function checkwalet(req, res, next) {
    const usewallet = req.body.usewallet;
    if (usewallet) {
        connection.query(
            `select deposit from user where User_ID = ?`,
            [req.body.User_ID],
            function (err, amount) {
                if (amount[0] > req.body.grandTotal) {
                    var firstDay = new Date();
                    var nextWeek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);
                    var order_id = shortid.generate()
                    connection.query(
                        `INSERT INTO orders (orderId, User_ID, Product_ID, product_qty, status, delivery_date, order_date) SELECT ?, User_ID,  Product_ID, product_qty, ?, DATE(?), DATE(?) FROM cart WHERE User_ID = ?;`,
                        [order_id, `Awaiting Payment`, nextWeek, firstDay, req.body.User_ID],
                        function (err, results) {
                            console.log(results || err);
                        }
                    )
                    const query = `INSERT INTO transaction (OrderID, payment_ID, type, mode, status) VALUE (?,?,?,?,?)`
                    connection.query(
                        query,
                        [order_id, shortid.generate(), req.body.type, 'Debit', 'Success'],
                        function (err, results) {
                            console.log(results || err);
                        }
                    )
                    connection.query(
                        `delete from cart where User_ID = ?`,
                        [req.body.User_ID],
                        function (err, results) {
                            console.log(results || err);
                        }
                    )
                    const query2 = `UPDATE orders SET status = 'Awaiting Fulfillment' WHERE orderId = ?`
                    connection.query(
                        query2,
                        [order_id],
                        function (err, results) {
                            console.log(results || err);
                        }
                    )
                    connection.query(
                        `update user set deposit = ? where User_ID = ?`,
                        [amount[0] - req.body.grandTotal, req.body.User_ID],
                        function (err, results) {
                            console.log(results || err);
                        }
                    )
                    res.json(res.json({
                        id: order_id,
                        wallet: true
                    }))
                } else {
                    res.json({ message: "Not enough Balance in wallet" })
                }
            }
        )
    } else {
        return next()
    }

}

exports = module.exports = { route }