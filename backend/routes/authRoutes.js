import express from 'express';
import { Login } from '../controllers/authController.js';
import { LoginValidation } from '../middlewares/authValidation.js';

const router = express.Router();

router.post('/login', LoginValidation, Login);

export default router;
