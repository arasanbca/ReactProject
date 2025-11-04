const OrderModel = require("../Models/OrderModel");
const productModel = require("../Models/ProductModel");

exports.createOrder = async (req,res,next)=>{
    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc, items)=>(acc + items.product.price * items.qty),0)).toFixed(2);
    const status="pending";

    const order = await OrderModel.create({
        cartItems,amount,status
    })

    cartItems.forEach(async(item)=>{
        const product = await productModel.findById(item.product._id);
        product.stock = product.stock - item.qty;
        await product.save();
    })
    res.json({
        success:true,
        order
    })
}