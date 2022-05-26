import { Router } from 'express';
import { updateUserToVendor } from '../auth/auth.controller.js';
import {
    createStore,
    deleteStore,
    getStoreBuyId,
    getStoreBuyVendorId,
    updateStore,
} from './store.controller.js';

const router = Router({ mergeParams: true });

router
    .route('/')
    .post(updateUserToVendor, createStore)
    .get(getStoreBuyVendorId);
router.route('/:id').get(getStoreBuyId).patch(updateStore).delete(deleteStore);

export default router;
