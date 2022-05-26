import { Router } from 'express';
import { verifyToken } from '../../library/firebase.admin.js';
import { login, signUp, virtualPopulate } from './auth.controller.js';

const router = Router();

router.post('/signup', signUp);
router.post('/login', verifyToken, login);
router.get('/:email', virtualPopulate);

export default router;
