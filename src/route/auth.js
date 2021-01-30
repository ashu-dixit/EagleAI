const { connection } = require('../sqldb');
const JWT = require('jsonwebtoken')
const route = require('express').Router();
const secret = require('../../config').JWTsecret
route.post('/customer', (req, res) => {
    const MobNo1 = req.body.MobNo1
    connection.query(
        `Select User_ID, Name, MobNo1, MobNo2, Address, City from users where MobNo1 = ?`,
        [MobNo1],
        function (error, users) {
            if (error) res.json(error)
            if (users.length == 0) {
                connection.query(
                    `INSERT INTO users (Name, MobNo1, MobNo2,Address, VERIFIED, City) VALUE (?, ?, ?, ?, ?, ?, ?);`,
                    [req.body.Name, req.body.MobNo1, req.body.MobNo2, req.body.Address, req.body.VERIFIED, req.body.City],
                    function (err, results) {

                    }
                )
                connection.query(
                    `Select User_ID, Name, MobNo1, MobNo2, Address, City from users where MobNo1 = ?`,
                    [MobNo1],
                    function (err, users) {
                        const token = createToken(users[0]['User_ID'])
                        res.json({ token: token, user: users[0] })
                    }
                )
            } else {
                const token = createToken(users[0]['User_ID'])
                res.json({ token: token, user: users[0] })
            }

        }
    )
})

route.post('/vendor', (req, res) => {
    const MobNo1 = req.body.MobNo1
    connection.query(
        `Select User_ID, Name, MobNo1, MobNo2, VERIFIED, LastLogin, deposit, Shop_Owner_name, ShopGstno, ShopPhoneno, Shop_name, latitudes, longitude from users where MobNo1 = ?`,
        [MobNo1],
        function (error, users) {
            if (error) res.json(error)
            if (users.length == 0) {
                connection.query(
                    `INSERT INTO users (Name, MobNo1, MobNo2,Address, VERIFIED, City,  deposit, Shop_Owner_name, ShopGstno, ShopPhoneno, Shop_name, latitudes, longitude ) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                    [req.body.Name, req.body.MobNo1, req.body.MobNo2, req.body.Address, req.body.VERIFIED, req.body.City, req.body.deposit, req.body.Shop_Owner_name, req.body.ShopGstno, req.body.ShopPhoneno, req.body.Shop_name, req.body.latitudes, req.body.longtitude],
                    function (err, results) {
                        console.log(err || results)
                    }
                )
                connection.query(
                    `Select User_ID, Name, MobNo1, MobNo2, VERIFIED, LastLogin, deposit, Shop_Owner_name, ShopGstno, ShopPhoneno, Shop_name, latitudes, longitude from users where MobNo1 = ?`
                    [MobNo1],
                    function (err, users) {
                        const token = createToken(users[0]['User_ID'])
                        res.json({ token: token, user: users[0] })
                    }
                )
            } else {
                const token = createToken(users[0]['User_ID'])
                res.json({ token: token, user: users[0] })
            }
        }
    )
})

const createToken = (id) => {
    return JWT.sign({ id }, secret, {
        expiresIn: 365 * 24 * 60 * 60
    })
}

exports = module.exports = { route }