import handleAsyncError from '../Middleware/handleAsyncError.js';
import HandleError from '../Utils/handleError.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
    const {token} = req.cookies;
    console.log(token)
    if(!token){
        return next(new HandleError("Please login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedData);
    req.user=await User.findById(decodedData.id);
    next();

})