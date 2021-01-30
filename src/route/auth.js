const { connection } = require('../sqldb');
const JWT = require('jsonwebtoken')
const route = require('express').Router();
const secret = require('../../config').JWTsecret
route.post('/customer', (req, res) => {
    const MobNo = req.body.MobNo
    connection.query(
        `Select User_ID, Name, MobNo1, MobNo2, Address, City from users where MobNo1 = ?`,
        [MobNo],
        function (error, users) {
            if (error) res.json(error)
            if (users.length == 0) {
                res.send('User Not registered')
            } else {
                const token = createToken(users[0]['User_ID'])
                res.json({ token: token, user: users[0] })
            }
        }
    )
})

route.post('/vendor', (req, res) => {
    const MobNo = req.body.MobNo
    connection.query(
        `Select User_ID, Name, MobNo1, MobNo2, VERIFIED, LastLogin, deposit, Shop_Owner_name, ShopGstno, ShopPhoneno, Shop_name, latitudes, longitude from users where MobNo1 = ?`,
        [MobNo],
        function (error, users) {
            if (error) res.json(error)
            if (users.length == 0) {
                res.send('User Not registered')
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