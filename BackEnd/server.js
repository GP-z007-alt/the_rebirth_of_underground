import app from './app.js';
import dotenv from 'dotenv';
dotenv.config({path:'BackEnd/config/config.env'})
const port = process.env.PORT || 3000;

const getAllProducts = (req,res) => {
    res.status(200).json({
        message : "All Products"
    })
}
const getSingleProduct = (req,res) => {
    res.status(200).json({
        message : "Single Product"
    })
}

app.route("/api/v1/products").get(getAllProducts)
app.route("/api/v1/product").get(getSingleProduct)

app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`)
})