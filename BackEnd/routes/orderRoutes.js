import express from 'express';
import { createNewOrder } from '../controller/orderController';
import { verifyUserAuth } from '../Middleware/userAuth';

const router = express.Router();

router.route("/new/order").post(verifyUserAuth,createNewOrder)

export default router;