const route = require('express').Router()
const shortid = require('shortid')
const Razorpay = require('razorpay')
const razorpaykey = require('../../config').Razorpay
const { connection } = require('../sqldb')

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
        const query = `INSERT INTO transactions (OrderID, payment_ID, type, mode, status) VALUE (?,?,?,?,?,?,?)`
        connection.query(
            query,
            [req.body.orderID, req.body.payment_ID, req.body.type, 'Debit', 'Success'],
            function (err, results) {
                res.json({ status: 'ok' })
            }
        )
    } else {
        res.status(401)
    }
})

route.post('/verify', (req, res) => {
    // do a validation
    const query = `SELECT status FROM transactions WHERE OrderID = ?`
    connection.query(
        query,
        [req.body.orderId],
        function (err, results) {
            res.json(results || err)
        }
    )
})

route.post('/razorpay', async (req, res) => {
    const payment_capture = 1
    const options = {
        amount: parseInt(req.body.amount) * 100,
        currency: req.body.currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        const response = await razorpay.orders.create(options)
        connection.query(
            `INSERT INTO order(orderId, Vendor_ID, subTotal, itemDiscount, tax, shipping, total, promo, discount, grandTotal, name, mobile, email, address, city, country)
        VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [response.id, req.body.Vendor_ID, req.body.subTotal, req.body.itemDiscount, req.body.tax, req.body.shipping, req.body.total, req.body.promo, req.body.discount, req.body.grandTotal, req.body.name, req.body.mobile, req.body.email, req.body.address, req.body.city, req.body.country],
            function (err, results) {
                connection.query(
                    `INSERT INTO order_item (orderId, product_ID, product_qty) SELECT ? , Product_ID, product_qty FROM INTO carts WHERE Vendor_ID = ?;`
                    [response.id, req.body.Vendor_ID],
                    function (err, results) {
                        console.log(results || err);
                        res.json({
                            id: response.id,
                            currency: response.currency,
                            amount: response.amount,
                            response: response,
                        })
                    }
                )
            }
        )
    } catch (error) {
        console.log(error)
    }
})

exports = module.exports = { route }