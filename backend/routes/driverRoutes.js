import express from 'express';
import { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver } from '../controllers/driverController.js';
import { ensureAuthenticated } from '../middlewares/productAuthMiddle.js';

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', getAllDrivers);
router.get('/:id', getDriverById);
router.post('/', createDriver);
router.put('/:id', updateDriver);
router.delete('/:id', deleteDriver);

export default router;