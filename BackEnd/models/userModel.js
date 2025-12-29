import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

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
userSchema.pre("save", async function() {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
userSchema.methods.verifyPassword = async function(userEnteredPassword) {
  return await bcrypt.compare(userEnteredPassword, this.password);
};

// Generating Token
userSchema.methods.getResetPasswordToken = function() {
  const resetToken=crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire=Date.now()+5*60*1000; // 5 minutes
  return resetToken;
}

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;