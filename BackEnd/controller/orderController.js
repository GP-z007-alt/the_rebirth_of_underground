import Order from '../models/orederModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import handleAsyncError from '../Middleware/handleAsyncError.js';
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

// Get Single Order
export const getSingleOrder = handleAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new HandleError("Order Not Found with this Id",404));
    }
    res.status(200).json({
        success : true,
        order
    })
})

// All my Orders
export const allMyOrders = handleAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user : req.user._id});
    if(!orders){
        return next(new HandleError("You have no orders yet",404));
    }
    res.status(200).json({
        success : true,
        orders
    })
})

// Getting all the orders
export const getAllOrders = handleAsyncError(async(req,res,next)=>{
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });
    res.status(200).json({
        success : true,
        totalAmount,
        orders
    })
})
