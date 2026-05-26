import express from 'express';
import {
  uploadPassport,
  uploadVisa,
  uploadSelfie,
  submitKyc,
  getKycStatus,
} from '../controllers/kycController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.use(protect); // All KYC routes require authentication

// Using 'document' as the field name for file upload
router.post('/passport', upload.single('document'), uploadPassport);
router.post('/visa', upload.single('document'), uploadVisa);
router.post('/selfie', upload.single('document'), uploadSelfie);

router.post('/submit', submitKyc);
router.get('/status', getKycStatus);

export default router;
