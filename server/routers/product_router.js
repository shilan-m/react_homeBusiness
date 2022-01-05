var express = require('express');
var router = express.Router();

var multer  = require('multer')
var upload = multer({dest:"attachment/"})
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'attachment/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({ storage: storage })

var ProductController = require('../controllers/productController')
router.get('/filterProduct',ProductController.filterProduct);
router.put('/addNewProduct',upload.single('imgurl'),ProductController.addNew);
module.exports =router;
