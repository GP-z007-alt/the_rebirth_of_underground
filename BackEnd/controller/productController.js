import Product from '../models/productModel.js'
import HandleError from '../Utils/handleError.js';
import handleAsyncError from '../Middleware/handleAsyncError.js';
import APIFunctionality from '../Utils/apiFunctionality.js';

// http://localhost:8000/api/v1/product/6950617dc1a3f8d5fe598f0e?keyword=GUN1

// Creating Products
export const createProducts = handleAsyncError(async(req,res,next)=>{
    // console.log(req.body)
    const product = await Product.create(req.body)
    res.status(201).json({
        message : "Product Created Successfully",
        product
    })
})

// Getting All Products
export const getAllProducts = handleAsyncError(async(req,res,next) => {
    const apiFunctionality = new APIFunctionality(Product.find(), req.query).serach();
    const products = await apiFunctionality.query;
    res.status(200).json({
        message : "All Products",
        products
    })
})
// Update Product
export const updateProduct = handleAsyncError(async(req,res,next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })
    if(!product){
        return next(new HandleError("Product Not Found", 404))
    }
    res.status(200).json({
        message : "Product Updated Successfully",
        product
    })
})

// Delete Product
export const deleteProduct = handleAsyncError(async(req,res,next) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product){
            return next(new HandleError("Product Not Found", 404))
        }
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message : "Product Deleted Successfully",
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// Accessing Single Product
export const getSingleProduct = handleAsyncError(async(req,res,next) => {
    try {
        const product = await Product.findById(req.params.id); 
        if(!product){
            return next(new HandleError("Product Not Found", 404))
        }
        res.status(200).json({
            success : true,
            product
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})