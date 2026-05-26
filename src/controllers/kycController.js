import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';

// @desc    Upload Passport Image
// @route   POST /api/kyc/passport
// @access  Private
export const uploadPassport = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image file');
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update user's passport image path
  // Using relative path for the frontend to access via /uploads/...
  user.passportDocument = `/uploads/${req.file.filename}`;
  await user.save();

  successResponse(res, 200, 'Passport uploaded successfully', {
    passportDocument: user.passportDocument,
  });
});

// @desc    Upload Visa Image
// @route   POST /api/kyc/visa
// @access  Private
export const uploadVisa = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image file');
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.visaDocument = `/uploads/${req.file.filename}`;
  await user.save();

  successResponse(res, 200, 'Visa uploaded successfully', {
    visaDocument: user.visaDocument,
  });
});

// @desc    Upload Selfie Image
// @route   POST /api/kyc/selfie
// @access  Private
export const uploadSelfie = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image file');
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.selfieImage = `/uploads/${req.file.filename}`;
  await user.save();

  successResponse(res, 200, 'Selfie uploaded successfully', {
    selfieImage: user.selfieImage,
  });
});

// @desc    Submit KYC
// @route   POST /api/kyc/submit
// @access  Private
export const submitKyc = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Verify all documents are uploaded
  if (!user.passportDocument || !user.visaDocument || !user.selfieImage) {
    res.status(400);
    throw new Error('Please upload all required documents (Passport, Visa, Selfie) before submitting KYC.');
  }

  if (user.kycStatus === 'reviewing' || user.kycStatus === 'approved') {
    res.status(400);
    throw new Error(`KYC is already ${user.kycStatus}`);
  }

  user.kycStatus = 'reviewing';
  await user.save();

  successResponse(res, 200, 'KYC submitted successfully. Status is now reviewing.', {
    kycStatus: user.kycStatus,
  });
});

// @desc    Get KYC Status
// @route   GET /api/kyc/status
// @access  Private
export const getKycStatus = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  successResponse(res, 200, 'KYC status retrieved successfully', {
    kycStatus: user.kycStatus,
    isVerified: user.isVerified
  });
});
