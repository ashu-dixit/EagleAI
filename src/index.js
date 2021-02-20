const express = require('express');
const path = require('path')
const PORT = process.env.PORT || 8080
const authcheck = require('./route/authmiddleware').authcheck
const authcheckadmin = require('./route/authmiddleware').authcheckadmin

const morgan = require('morgan')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('tiny')) 

//refering to our static app in public folder
app.use(express.static(path.join(__dirname, 'public', 'build')));
app.use('/cart', authcheck, require('./route/cart').route)
app.use('/products', authcheck, require('./route/products').route)
app.use('/orders',  authcheck, require('./route/orders').route)
app.use('/pay', require('./route/payment').route)
app.use('/profile', authcheck, require('./route/user').route)
app.use('/search', require('./route/search').route)
app.use('/auth', require('./route/auth').route)
app.use('/admin', require('./route/admin').route)


app.listen(PORT, () => console.log("Hello"));