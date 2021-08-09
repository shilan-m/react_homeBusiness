var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/productController')
router.get('/filterProduct',ProductController.filterProduct);
module.exports =router;