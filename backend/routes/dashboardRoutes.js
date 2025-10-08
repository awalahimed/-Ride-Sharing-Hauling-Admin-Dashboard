import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { ensureAuthenticated } from '../middlewares/productAuthMiddle.js';

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/stats', getDashboardStats);

export default router;