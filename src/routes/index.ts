import {Router} from 'express';
const router = Router();
import { createProduct, getProducts, getProduct, deleteProduct, updateProduct } from '../controllers/product.controller'
import { createSales, deleteSales, getSales, getSale } from '../controllers/sales.controller';
import multer from '../libs/multer'

router.route('/product')
    .get(getProducts)
    .post(multer.single('image'), createProduct)
    
router.route('/product/:id')
    .get(getProduct)
    .delete(deleteProduct)
    .put(updateProduct)

router.route('/sale')
    .get(getSales)
    .post(createSales)

router.route('/sale/:id')
    .get(getSale)
    .delete(deleteSales)

export default router;