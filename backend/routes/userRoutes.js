import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { ensureAuthenticated } from '../middlewares/productAuthMiddle.js';

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;