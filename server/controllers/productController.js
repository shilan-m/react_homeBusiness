const productModel = require('../Models/productModel')
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
