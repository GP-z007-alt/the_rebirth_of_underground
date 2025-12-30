import handleAsyncError from '../Middleware/handleAsyncError.js';
import User from "../models/userModel.js";
import HandleError from '../Utils/handleError.js';
import { sendToken } from '../Utils/jwtToken.js';
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

// Reset Password
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

    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next (new HandleError(`Could not send email: ${error.message} , Please try again later!`,500));
    }
})