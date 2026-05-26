import express from 'express';
import {
  getAllUsers,
  getPendingKycUsers,
  approveKyc,
  rejectKyc,
} from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Apply auth and admin middleware to all routes in this file
router.use(protect, admin);

router.get('/users', getAllUsers);
router.get('/kyc/pending', getPendingKycUsers);
router.put('/kyc/:id/approve', approveKyc);
router.put('/kyc/:id/reject', rejectKyc);

export default router;
