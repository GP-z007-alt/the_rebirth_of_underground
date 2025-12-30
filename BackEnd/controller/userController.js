import handleAsyncError from '../Middleware/handleAsyncError.js';
import User from "../models/userModel.js";
import HandleError from '../Utils/handleError.js';
import { sendToken } from '../Utils/jwtToken.js';
import { sendEmail } from '../Utils/sendEmail.js';
import crypto from 'crypto';

// Register User
export const registerUser = handleAsyncError(async (req, res, next) => {
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl"
        }
    });
    sendToken(user,201,res);
});

// Login
export const loginUser = handleAsyncError(async (req, res, next) => {
    const {email,password} = req.body;
    if(!email || !password){
        return next(new HandleError("Please enter email and password",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new HandleError("Invalid email or password",401));
    }
    const isPasswordValid = await user.verifyPassword(password);
    if(!isPasswordValid){
        return next(new HandleError("Invalid email or password",401));
    }
    sendToken(user,200,res);

});

// Logout
export const logout=handleAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    });
})

// Forgot Password
export const requestPasswordReset=handleAsyncError(async(req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email});
    if(!user){
        return next (new HandleError("User not found with this email",400));
    }
    let resetToken;
    try{
        resetToken=user.getResetPasswordToken();
        await user.save({validateBeforeSave:false});
        
    }catch(error){
        console.log(error);
        
        return next(new HandleError(`Could not generate reset token: ${error.message} , Please try again later!`,500));
    }
    const resetPasswordURL=`http://localhost/api/v1/reset/${resetToken}`;
    const message = `Your password reset token is as follows:\n\n${resetPasswordURL}\n\nThis link will expire in 5 minutes.\n\nIf you have not requested this email, please ignore it.`;
    try{
        // Send Email
        await sendEmail({
            email:user.email,
            subject:"Password Reset Request",
            message:message
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        });
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next (new HandleError(`Could not send email: ${error.message} , Please try again later!`,500));
    }
})

// Reset Password
export const resetPassword=handleAsyncError(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash('sha256').
    update(req.params.token).digest('hex');
    const user=await User.findOne({
        resetPasswordToken:resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });
if(!user){
    return next(new HandleError("Reset password token is invalid or has expired",400));
}
const {password,confirmPassword}=req.body;
if(password!==confirmPassword){
    return next (new HandleError("Password and Confirm Password do not match",400));
}
user.password=password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;
await user.save();
sendToken(user,200,res);
});

// Get User Details
export const getUserDetails=handleAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    });
})

// Update User Password
export const updatePassword=handleAsyncError(async(req,res,next)=>{
    const {oldPassword,newPassword,confirmNewPassword}=req.body;
    const user = await User.findById(req.user.id).select('+password')
    const checkPasswordMatch=await user.verifyPassword(oldPassword);
    if(!checkPasswordMatch){
        return next(new HandleError("Old password is incorrect",400));
    }
    if(newPassword!==confirmNewPassword){
        return next(new HandleError("New password and confirm new password do not match",400));
    }
    user.password=newPassword;
    await user.save();
    sendToken(user,200,res);
})

// Updating User Profile
export const updateProfile=handleAsyncError(async(req,res,next)=>{
    const {name,email}=req.body;
    const updateUserDetails={
        name,
        email
    };
    const user = await User.findByIdAndUpdate(req.user.id,updateUserDetails,{
        new:true,
        runValidators:true,
    });
    res.status(200).json({
        success:true,
        message:"Profile updated successfully",
        user
    });
})

// Admin : Getting user information

export const getUsersList=handleAsyncError(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users,
    });
})

// Admin : Getting single user information
export const getSingleUser=handleAsyncError(async(req,res,next)=>{
    // console.log(req.params.id);
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new HandleError(`User does not exist with id: ${req.params.id}`,400));
    }
    res.status(200).json({
        success:true,
        user,
    }); 
})

// Admin : Changing user role
export const updateUserRole=handleAsyncError(async(req,res,next)=>{
    const {role}=req.body;
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new HandleError(`User does not exist with id: ${req.params.id}`,400));
    }
    const updatedUser=await User.findByIdAndUpdate(req.params.id,{role},{new:true,runValidators:true});
    res.status(200).json({
        success:true,
        user,
    }); 
})

// Admin : Deleting user

export const deleteUser=handleAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new HandleError(`User does not exist with id: ${req.params.id}`,400));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    });
})