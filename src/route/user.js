const route = require('express').Router()
const connection = require('../sqldb').connection

route.get('/customer', (req, res) => {
    res.json(res.locals.user)
})

route.get('/vendor', (req, res) => {
    res.json(res.locals.user)
})

route.patch('/customer', (req, res) => {
    const Name = req.body.Name || res.locals.user.Name
    const MobNo1 = req.body.MobNo1 || res.locals.user.MobNo1
    const MobNo2 = req.body.MobNo2 || res.locals.user.MobNo2
    const Address = req.body.Address || res.locals.user.Address
    const City = req.body.City || res.locals.user.City
    const query = `UPDATE user set Name = ?, MobNo1 = ?, MobNo2 = ?, Address = ?, city = ? WHERE User_ID = ?;`
    connection.query(
        query,
        [Name, MobNo1, MobNo2, Address, City, res.locals.user.User_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})

route.patch('/vendor', (req, res) => {
    const query = `UPDATE user set Name = ?, MobNo1 = ?, MobNo2 = ?, Address = ?, VERIFIED =  ?, city = ?, deposit = ?, Shop_Owner_name = ?, ShopGstno = ?, ShopPhoneno = ?, Shop_name = ?, latitudes = ?, longitude = ? WHERE User_ID = ?;`
    console.log(req.body)
    connection.query(
        query,
        [req.body.Name, req.body.MobNo1, req.body.MobNo2, req.body.Address, req.body.VERIFIED, req.body.City, req.body.deposit, req.body.Shop_Owner_name, req.body.ShopGstno, req.body.ShopPhoneno, req.body.Shop_name, req.body.latitudes, req.body.longtitude, res.locals.user.User_ID],
        function (err, results) {
            res.send(results || err);
        }
    )
})
exports = module.exports = { route }