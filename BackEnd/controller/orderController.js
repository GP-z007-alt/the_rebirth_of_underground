import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import handleAsyncError from '../middleware/asyncError.js';
import HandleError from '../Utils/handleError.js';

// Create New Order
export const createNewOrder = handleAsyncError(async(req,res,next)=>{
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt : Date.now(),
        user:req.user._id
    });
    res.status(201).json({
        success : true,
        message : "Order Placed Successfully",
        order
    })
})