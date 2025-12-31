import express from 'express';
import { allMyOrders, createNewOrder, getAllOrders, getSingleOrder } from '../controller/orderController.js';
import { roleBasedAccess, verifyUserAuth } from '../Middleware/userAuth.js';

const router = express.Router();

router.route("/new/order").post(verifyUserAuth,createNewOrder)
router.route("/admin/order/:id").get(verifyUserAuth,roleBasedAccess('admin'),getSingleOrder)
router.route("/admin/orders").get(verifyUserAuth,roleBasedAccess('admin'),getAllOrders)
router.route("/orders/user").get(verifyUserAuth,allMyOrders)

export default router;