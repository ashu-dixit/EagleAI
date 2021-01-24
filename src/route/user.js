const route = require('express').Router()
const connection = require('../sqldb').connection

route.post('/', (req, res) => {
    const query = `INSERT INTO 
                users (Name, MobNo1, MobNo2,Address, VERIFIED, City, deposit) 
                VALUE (?, ?, ?, ?, ?, ?, ?);`
    connection.query(
        query,
        [req.body.Name, req.body.MobNo1, req.body.MobNo2, req.body.Address, req.body.VERIFIED, req.body.City, req.body.deposit],
        function (err, results) {
            res.send(results || err)
        }
    )
})
route.get('/', (req, res) => {
    const query2 = `SELECT * FROM users where User_ID = ?;`
    connection.query(
        query2,
        [req.body.User_ID],
        function (err, results) {
            if (results) {
                res.status(200).json(results);
            } else {
                res.status(400).json(err);
            }
        }
    )

})

route.patch('/', (req, res) => {
    const query = `UPDATE users set Name = ?, MobNo1 = ?, MobNo2 = ?, Address = ?, VERIFIED =  ?, city = ?, deposit = ? WHERE Product_ID = ?;`
    connection.query(
        query,
        [req.body.Name, req.body.MobNo1, req.body.MobNo2, req.body.Address, req.body.VERIFIED, req.body.City, req.body.deposit],
        function (err, results) {
            res.send(results || err);
        }
    )
})

exports = module.exports = { route }