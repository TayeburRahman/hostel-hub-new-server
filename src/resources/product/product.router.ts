import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getProductByID,
    updateProduct,
} from './product.controller.js';

const router = Router({ mergeParams: true });

router.route('/').get(getAllProduct).post(createProduct);

router
    .route('/:id')
    .get(getProductByID)
    .patch(updateProduct)
    .delete(deleteProduct);
export default router;
