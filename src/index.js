const express = require('express');
const path = require('path')
const PORT = process.env.PORT||8080


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//refering to our static app in public folder
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/cart', require('./route/cart').route)
app.use('/products', require('./route/products').route)

app.listen(PORT, () => console.log("Hello"));