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

