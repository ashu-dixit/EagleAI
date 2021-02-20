const JWT = require('jsonwebtoken')
const JWTsecret = require('../../config').JWTsecret
const connection = require('../sqldb').connection
const authcheck = (req, res, next) => {
    const token = (req.headers['authorization']);
    if (token) {
        JWT.verify(token, JWTsecret, (err, decodeToken) => {
            if (err) {
                console.log(err);
                res.json({ message: 'Not Authorised' })
            } else {
                connection.query(
                    'select * from user where User_ID = ?',
                    [decodeToken.id],
                    function (err, users) {
                        if (users) {
                            res.locals.user = users[0]
                            next()
                        } else {
                            res.json({ message: 'User not found', err })
                        }

                    }
                )
            }
        })
    } else {
        res.json({ message: 'Not Authorised' })
    }
}
const authcheckadmin = (req, res, next) => {
    const token = (req.headers.authorization);
    if (token) {
        JWT.verify(token, JWTsecret, (err, decodeToken) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Not Authorised' })
            } else {
                connection.query(
                    'select * from user where User_ID = ?',
                    [decodeToken.id],
                    function (err, users) {
                        if (users) {
                            res.locals.user = users[0]
                            next()
                        } else {
                            res.json({ message: 'User not found', err })
                        }

                    }
                )
            }
        })
    } else {
        res.status(500).json({ message: 'Not Authorised' })
    }
}
exports = module.exports = { authcheck, authcheckadmin }