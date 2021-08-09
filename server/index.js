const express = require('express')
const productModel = require('./Models//productModel')
const route = require('./routers/product_router')
const app = express()
const port = 8080

app.use('/',route);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})