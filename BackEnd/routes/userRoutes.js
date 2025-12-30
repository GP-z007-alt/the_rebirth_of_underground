import express from 'express';
import { registerUser, resetPassword } from '../controller/userController.js';
import { loginUser } from '../controller/userController.js';
import { logout } from '../controller/userController.js';
import { requestPasswordReset } from '../controller/userController.js';
const router = express.Router();
import { getUserDetails } from '../controller/userController.js';
import { verifyUserAuth } from '../Middleware/userAuth.js';
import { updatePassword } from '../controller/userController.js';


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/password/forgot").post(requestPasswordReset);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").post(verifyUserAuth, getUserDetails);
router.route("/password/update").post(verifyUserAuth, updatePassword);
export default router
updatePassword