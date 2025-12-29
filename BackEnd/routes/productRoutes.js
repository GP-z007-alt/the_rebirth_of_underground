import express from 'express';
import { createProducts, deleteProduct, getAllProducts, getSingleProduct, updateProduct} from '../controller/productController.js';
import { verifyUserAuth } from '../Middleware/userAuth.js';
const router = express.Router();

// Routes
router.route("/products").get(verifyUserAuth, getAllProducts).post(verifyUserAuth, createProducts);
router.route("/product/:id").put(verifyUserAuth, updateProduct)
.delete(deleteProduct).get(getSingleProduct);


export default router;
