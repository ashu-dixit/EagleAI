const route = require('express').Router()
const connection = require('../sqldb').connection

route.post('/customer', (req, res) => {
    const query = `INSERT INTO 
                users (Name, MobNo1, MobNo2,Address, VERIFIED, City) 
                VALUE (?, ?, ?, ?, ?, ?, ?);`
    connection.query(
        query,
        [req.body.Name, req.body.MobNo1, req.body.MobNo2, req.body.Address, req.body.VERIFIED, req.body.City],
        function (err, results) {
            res.send(results || err)
        }
    )
})

route.post('/vendor', (req, res) => {
    const query = `INSERT INTO 
                users (Name, MobNo1, MobNo2,Address, VERIFIED, City,  deposit, Shop_Owner_name, ShopGstno, ShopPhoneno, Shop_name, latitudes, longtitude ) 
                VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    connection.query(
        query,
        [req.body.Name, req.body.MobNo1, req.body.MobNo2, req.body.Address, req.body.VERIFIED, req.body.City, req.body.deposit, req.body.Shop_Owner_name, req.body.ShopGstno, req.body.ShopPhoneno, req.body.Shop_name, req.body.latitudes, req.body.longtitude],
        function (err, results) {
            res.send(results || err)
        }
    )
})

route.get('/customer/:id', (req, res) => {
    const query = `Select User_ID, Name, MobNo1, MobNo2, Address, VERIFIED, City, LastLogin from users where user_ID = ?`
    connection.query(query, [req.params.id], function (err, result) { console.log("HR"); res.send(result[0] || err) })
})

route.get('/vendor/:id', (req, res) => {
    const query = `Select User_ID, Name, MobNo1, MobNo2, VERIFIED, LastLogin, deposit, Shop_Owner_name, ShopGstno, ShopPhoneno, Shop_name, latitudes, longtitude from users where user_ID = ?`
    connection.query(query, [req.params.id], function (err, result) { res.send(result[0]) })
})

route.patch('/customer', (req, res) => {
    const query = `UPDATE users set Name = ?, MobNo1 = ?, MobNo2 = ?, Address = ?, VERIFIED =  ?, city = ? WHERE User_ID = ?;`
    connection.query(
        query,
        [req.body.Name, req.body.MobNo1, req.body.MobNo2, req.body.Address, req.body.VERIFIED, req.body.City, req.body.deposit, req.body.User_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

route.patch('/vendor', (req, res) => {
    const query = `UPDATE users set Name = ?, MobNo1 = ?, MobNo2 = ?, Address = ?, VERIFIED =  ?, city = ?, deposit = ?, Shop_Owner_name = ?, ShopGstno = ?, ShopPhoneno = ?, Shop_name = ?, latitudes = ?, longtitude = ? WHERE User_ID = ?;`
    connection.query(
        query,
        [req.body.Name, req.body.MobNo1, req.body.MobNo2, req.body.Address, req.body.VERIFIED, req.body.City, req.body.deposit,  req.body.Shop_Owner_name, req.body.ShopGstno, req.body.ShopPhoneno, req.body.Shop_name, req.body.latitudes, req.body.longtitude, req.body.User_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})
exports = module.exports = { route }