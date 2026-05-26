import express from 'express';
import authRoutes from './authRoutes.js';
import kycRoutes from './kycRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/kyc', kycRoutes);
router.use('/admin', adminRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy' });
});

export default router;
