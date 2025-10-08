import express from 'express';
import { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff } from '../controllers/staffController.js';
import { ensureAuthenticated } from '../middlewares/productAuthMiddle.js';

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', getAllStaff);
router.get('/:id', getStaffById);
router.post('/', createStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

export default router;