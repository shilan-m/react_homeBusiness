const express = require('express')
var bodyParser = require('body-parser')
const productModel = require('./Models//productModel')
const route = require('./routers/product_router')
const app = express()
const port = 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',route);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})