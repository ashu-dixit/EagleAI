const { connection } = require('../sqldb');

const route = require('express').Router();

route.get('/customer/:id', (req, res) => {
    const query = `Select User_ID, Name, MobNo1, MobNo2, Address, VERIFIED, City, LastLogin from users where userID = ?`
    console.log("HR");
    connection.query(query, [req.params.id], function (err, results) { res.send(results[0]) })
})

route.get('/vendor/:id', (req, res) => {
    const query = `Select User_ID, Name, MobNo1, MobNo2, VERIFIED, LastLogin deposit, Shop_Owner_name, ShopGstno, ShopPhoneno, Shop_name, latitudes, longtitude from users where userID = ?`
    connection.query(query, [req.params.id], function (err, results) { res.send(results[0]) })
})