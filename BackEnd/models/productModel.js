import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter Product description"],
    },
    price:{
        type:Number,
        required:[true,"Please enter Product Price"],
        maxLength:[7,"Price can't exceed 7 Digit!"]
    },
    ratings:{
        type:Number,
        default:0,
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter Product Category"],
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[5,"Stock can't exceed 5 Digit!"],
        default:1
    },
    numofReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            ratings:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("Product" ,productSchema )