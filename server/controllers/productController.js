const productModel = require('../Models/productModel')
const path = require("path");
const fs = require("fs");
module.exports.filterProduct = function(req,res) {
  const queryObj= req.query;
  productModel.selectReuslt(queryObj,function(err,result){
      if (err) {
        res.json(err);
    } else {
        res.json(result);
    }
  });
}
module.exports.addNew = function(req,res) {
  // console.log(req.body);
  console.log(req);
  res.send("i'm back")
}
module.exports.imageTest = function(req,res) {
  console.log(req.file, req.body)
  res.send("i'm back")

}
