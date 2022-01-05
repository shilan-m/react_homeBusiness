const productModel = require('../Models/productModel')
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const upload = multer({dest:'productImages/'})
module.exports.filterProduct = function(req,res) {
  const queryObj= req.query;
  productModel.selectProducts(queryObj,function(err,result){
      if (err) {
        res.json(err);
    } else {
        res.json(result);
    }
  });
}
module.exports.addNew = function(req,res) {
  productModel.insertAProduct(req.body,function(err,result){
    if (err) {
      res.json(err);
  } else {
      res.json(result);
  }
});
  console.log(req.file);
  console.log(req.body);
  res.send("i'm back")
}