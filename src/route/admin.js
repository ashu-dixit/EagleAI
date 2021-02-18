const route = require('express').Router()
const connection = require('../sqldb').connection

route.get('/vendors/', (req, res) => {
    const query = `Select User_ID, Name, MobNo1, MobNo2, VERIFIED, LastLogin, deposit, Shop_Owner_name, ShopGstno, ShopPhoneno, Shop_name, latitudes, longitude from user where VERIFIED = 1`
    connection.query(query, function (err, result) { res.send(result || err) })
})
route.get('/customers/', (req, res) => {
    const query = `Select User_ID, Name, MobNo1, MobNo2, Address, VERIFIED, City, LastLogin from user`
    connection.query(query, function (err, result) { res.send(result || err) })
})

route.get('/orders', (req, res) => {
    connection.query(
        `select status, count(*) AS c from orders group by status`,
        function (err, data) {
            connection.query(
                `select * from orders where status <> 'Delivered'`,
                function (err, results) {
                    console.log(err)
                    const re = {
                        orders: results,
                        data: data
                    }
                    res.json(re)
                }
            )
        }
    )

})
route.get('/products', (req, res) => {
    const query1 = `SELECT * FROM product where disabled = 0;`
    connection.query(
        query1,
        function (err, results) {
            if (results) {
                res.status(200).json(results);
            } else {
                res.status(400).json(err);
            }
        }
    )
})
route.get('/transactions', (req, res) => {

    connection.query(
        `Select * from transaction where status <> 'Failed'`,
        function (err, data) {
            res.json(data || err)
        }
    )
})
route.patch('/orders', (req, res) => {
    console.log(req.body)
    const query = `UPDATE orders SET status = ?, delivery_date = STR_TO_DATE(?, "%Y-%m-%d") WHERE OrderId = ? and Product_ID = ?`
    connection.query(
        query,
        [req.body.status, req.body.delivery_date, req.body.OrderId, req.body.Product_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

route.patch('/products', (req, res) => {
    const query = `UPDATE product set Vendor_ID = ?, product_name = ?, product_price = ?, max_product_qty = ?, expiry_date =  STR_TO_DATE(?, "%Y-%m-%d"), product_image = ?, discount = ?, category = ? WHERE Product_ID = ?;`
    connection.query(
        query,
        [req.body.Vendor_ID, req.body.product_name, req.body.product_price, req.body.max_product_qty, req.body.expiry_date, req.body.product_image, req.body.discount, req.body.category, req.body.Product_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

route.patch('/customer', (req, res) => {
    const query = `UPDATE user set Name = ?, MobNo1 = ?, MobNo2 = ?, Address = ?, city = ? WHERE User_ID = ?;`
    connection.query(
        query,
        [req.body.Name, req.body.MobNo1, req.body.MobNo2, req.body.Address, req.body.City, req.body.User_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

route.patch('/vendor', (req, res) => {
    console.log(req.body);
    const query = `UPDATE user set Name = ?, MobNo1 = ?, MobNo2 = ?, Address = ?, VERIFIED =  ?, city = ?, deposit = ?, Shop_Owner_name = ?, ShopGstno = ?, ShopPhoneno = ?, Shop_name = ?, latitudes = ?, longitude = ? WHERE User_ID = ?;`
    connection.query(
        query,
        [req.body.Name, req.body.MobNo1, req.body.MobNo2, req.body.Address, req.body.VERIFIED, req.body.City, req.body.deposit, req.body.Shop_Owner_name, req.body.ShopGstno, req.body.ShopPhoneno, req.body.Shop_name, req.body.latitudes, req.body.longitude, req.body.User_ID],
        function (err, results) {
            res.send(results || err);
            console.log(results || err)
        }
    )
})
route.post('/products', (req, res) => {
    const query = `INSERT INTO product (Vendor_ID, product_name, product_price, max_product_qty, expiry_date, product_image, discount, category, disabled) VALUE (?, ?, ?, ?, STR_TO_DATE(?, "%Y-%m-%d"), ?, ?, ?, ?);`
    connection.query(
        query,
        [req.body.Vendor_ID, req.body.product_name, req.body.product_price, req.body.max_product_qty, req.body.expiry_date, req.body.product_image, req.body.discount, req.body.category, 0],
        function (err, results) {
            res.send(results || err)
        }
    )
})

route.delete('/products', (req, res) => {
    const query = 'Update product set disabled = 1 WHERE Product_ID = ?'
    res.status(200)
    connection.query(
        query,
        [req.body.Product_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

exports = module.exports = { route }
