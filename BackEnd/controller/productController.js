import Product from '../models/productModel.js'

// Creating Products
export const createProducts = async(req,res)=>{
    // console.log(req.body)
    const product = await Product.create(req.body)
    res.status(201).json({
        message : "Product Created Successfully",
        product
    })
}

// Getting All Products
export const getAllProducts = async(req,res) => {
    const products = await Product.find()
    res.status(200).json({
        message : "All Products",
        products
    })
}
// Update Product
export const updateProduct = async(req,res) => {
    let product = await Product.findById(req.params.id);
    console.log(product);
    if(!product){
        return res.status(500).json({
            sucess : false,
            message : "Product Not Found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })
    res.status(200).json({
        message : "Product Updated Successfully",
            product
    })
}

// Delete Product
export const deleteProduct = async(req,res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({ 
                success : false,
                message : "Product Not Found"
            })
        }
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message : "Product Deleted Successfully",
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Accessing Single Product
export const getSingleProduct = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id); 
        if(!product){
            return res.status(500).json({ 
                success : false,
                message : "Product Not Found"
            })
        }
        res.status(200).json({
            success : true,
            product
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}