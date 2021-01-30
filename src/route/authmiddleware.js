const JWT = require('jsonwebtoken')
const JWTsecret = require('../../config').JWTsecret
const authcheck = (req, res, next) => {
    const token = (req.headers['authorization']);
    // console.log(token);
    if(token){
        JWT.verify(token, JWTsecret, (err, decodeToken) => {
            if(err){
                console.log(err);
                res.json({message: 'Not Authorised'})
            }else{
                res.locals.User_ID = decodeToken.id
                console.log(decodeToken)
                next()
            }
        })
    }else{
        res.json({message: 'Not Authorised'})
    }
}
exports = module.exports = { authcheck }