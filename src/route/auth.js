const { connection } = require('../sqldb');
const JWT = require('jsonwebtoken')
const route = require('express').Router();
const secret = require('../../config').JWTsecret
route.post('/customer', (req, res) => {
    var MobNo1 = req.body.MobNo1
    if (MobNo1.charAt(0) == '+') {
        MobNo1 = MobNo1.substr(3)
    } else if (MobNo1.charAt(0) == '+') {
        MobNo1 = MobNo1.substr(1)
    }
    connection.query(
        `Select User_ID, Name, MobNo1, MobNo2, Address, City from user where MobNo1 = ?`,
        [MobNo1],
        function (error, users) {
            if (error) res.json(error)
            if (users.length == 0) {
                connection.query(
                    `INSERT INTO user (MobNo1, VERIFIED) VALUE (?, ?);`,
                    [MobNo1, 0],
                    function (err, results) {
                        if (results) {
                            connection.query(
                                `Select User_ID, Name, MobNo1, MobNo2, Address, City from user where MobNo1 = ?`,
                                [MobNo1],
                                function (err, users) {
                                    const token = createToken(users[0]['User_ID'])
                                    err ? res.json({ message: err }) : res.json({ token: token, user: users[0] })
                                }
                            )
                        } else {
                            const token = createToken(users[0]['User_ID'])
                            res.json({ token: token, user: users[0] })
                        }
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
    var MobNo1 = req.body.MobNo1
    if (MobNo1.charAt(0) == '+') {
        MobNo1 = MobNo1.substr(3)
    } else if (MobNo1.charAt(0) == '+') {
        MobNo1 = MobNo1.substr(1)
    }
    connection.query(
        `Select * from user where MobNo1 = ?`,
        [MobNo1],
        function (error, users) {
            if (error) res.json(error)
            if (users.length == 0) {
                connection.query(
                    `INSERT INTO user (MobNo1, VERIFIED, isvendor) VALUE (?, ?, ?);`,
                    [MobNo1, 0, 1],
                    function (err, results) {
                        connection.query(
                            `Select * from user where MobNo1 = ?`,
                            [MobNo1],
                            function (err, users) {
                                const token = createToken(users[0]['User_ID'])
                                err ? res.json({ message: err }) : res.json({ token: token, user: users[0] })
                            }
                        )
                    }
                )
            } else {
                const token = createToken(users[0]['User_ID'])
                res.json({ token: token, user: users[0] })
            }
        }
    )
})

route.post('/admin', (req, res) => {
    var MobNo1 = req.body.MobNo1
    if (MobNo1.charAt(0) == '+') {
        MobNo1 = MobNo1.substr(3)
    } else if (MobNo1.charAt(0) == '+') {
        MobNo1 = MobNo1.substr(1)
    }
    connection.query(
        `Select * from user where MobNo1 = ?`,
        [MobNo1],
        function (error, users) {
            if (error) res.json({ message: "Server Error" })
            if (users.length == 0) res.json({ message: "User does not exist" })
            if (users[0]['Isadmin'] == 1) {
                const token = createToken(users[0]['User_ID'])
                res.json({ token: token, user: users[0] })
            } else {
                res.json({ message: "You are not Admin" })
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