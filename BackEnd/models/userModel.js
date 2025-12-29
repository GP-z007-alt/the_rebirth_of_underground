import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
  },
  email:{
    type:String,
    required:[true,"Please provide your email"],
    unique:true,
    validate:[validator.isEmail,"Please provide a valid email"]
  },
  password:{
    type:String,
    required:[true,"Please provide a password"],
    minlength:[6,"Password must be at least 6 characters long"],
    select:false
  },
  avatar:{
    public_id:{
      type:String,
      required:true 
  },
    url:{
      type:String,
      required:true
  } 
    }, 
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
},
{timestamps:true});

// Password hashing

export default mongoose.model("User", userSchema);