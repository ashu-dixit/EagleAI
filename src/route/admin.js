const route = require('express').Router()
const connection = require('../sqldb').connection


route.get('/vendors/', (req, res) => {
    const query = `Select User_ID, Name, MobNo1, MobNo2, VERIFIED, LastLogin, deposit, Shop_Owner_name, ShopGstno, ShopPhoneno, Shop_name, latitudes, longitude from users where VERIFIED = 1`
    connection.query(query, function (err, result) { res.send(result || err) })
})
route.get('/customers/', (req, res) => {
    const query = `Select User_ID, Name, MobNo1, MobNo2, Address, VERIFIED, City, LastLogin from users`
    connection.query(query, function (err, result) { console.log("HR"); res.send(result || err) })
})

route.get('/orders', (req, res) => {
    connection.query(
        `select count(*) from orders group by status`,
        function (err, data) {
            connection.query(
                `select * from orders where orders <> 'Delivery'`,
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
route.get('/transactions', (req, res) => {

    connection.query(
        `Select * from transactions where status <> 'Failed'`,
        function (err, data) {
            res.json(data || err)
        }
    )
})
exports = module.exports = { route }
