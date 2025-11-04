const productModel = require("../Models/ProductModel");

exports.getproduct = async (req,res,next)=>{
    const a = req.query.keyword?{ name : {
        $regex: req.query.keyword,
        $options: 'i'
    }}:{}
    const products = await productModel.find(a);
    res.json({
        success:true,
        products
    })
}

exports.getSingleproduct = async(req,res,next)=>{
    const product = await productModel.findById(req.params.id);

    res.json({
        success:true,
        product
    })
}

