import Product from '../models/productModel.js'
import HandleError from '../Utils/handleError.js';
import handleAsyncError from '../Middleware/handleAsyncError.js';
import APIFunctionality from '../Utils/apiFunctionality.js';

// http://localhost:8000/api/v1/product/6950617dc1a3f8d5fe598f0e?keyword=GUN1

// Creating Products
export const createProducts = handleAsyncError(async(req,res,next)=>{
    // console.log(req.body)
    req.body.user=req.user.id;
    const product = await Product.create(req.body)
    res.status(201).json({
        message : "Product Created Successfully",
        product
    })
})

// Getting All Products
export const getAllProducts = handleAsyncError(async(req,res,next) => {
    const resultsPerPage = 5;
    const apiFeatures = new APIFunctionality(Product.find(), req.query).serach().filter();

    // Getting filtered query
    const filteredQuery = apiFeatures.query.clone();
    const productCount = await filteredQuery.countDocuments();

    // Calculate total pages based on filtered results
    const totalPages = Math.ceil(productCount / resultsPerPage);
    const page = Number(req.query.page) || 1;
    if(page > totalPages && productCount > 0){
        return next(new HandleError("Page Not Found", 404));
    }

    // Apply pagination
    apiFeatures.pagination(resultsPerPage);
    const products = await apiFeatures.query;
    
    if (!products || products.length === 0) {
        return next(new HandleError("No Products Found", 404));
    }
    res.status(200).json({
        message : "All Products",
        products,
        productCount,
        resultsPerPage,
        totalPages,
        currentPage : page
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

// Creating and updating products review
export const createReviewForProduct = handleAsyncError(async(req,res,next) => {
    const {ratings, comment, productId} = req.body;

    const review = {
        user : req.user._id,
        name : req.user.name,
        ratings : Number(ratings),
        comment
    }
    const product = await Product.findById(productId);
    const reviewExists = product.reviews.find(review => review.user.toString() === req.user._id.toString());
    if(reviewExists){
        product.reviews.forEach( review => {
            if(review.user.toString() === req.user.id.toString()){
                review.comment = comment;
                review.ratings = ratings;
            }
        })
    }else{
        product.reviews.push(review);
        
    }
    product.numofReviews = product.reviews.length;
    let sum = 0;
    product.reviews.forEach( review => {
        sum += review.ratings;
    })
    product.ratings = product.reviews.length > 0 ? sum / product.reviews.length : 0;
    await product.save({validateBeforeSave : false});
    res.status(200).json({
        success : true,
        product,
        message : "Review added/updated successfully"
    })
    
});

// Getting reviews
export const getProductReviews = handleAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new HandleError("Product Not Found", 400))
    }

    res.status(200).json({
        success : true,
        reviews : product.reviews
    })
})


// Admin - Get All Products
export const getAdminProducts = handleAsyncError(async(req,res,next) => {
    const products = await Product.find();
    res.status(200).json({
        success : true,
        message : "All Products for Admin",
        products
    })
})