import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/User.js';
import { successResponse } from '../utils/response.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).select('-password');
  successResponse(res, 200, 'Users retrieved successfully', users);
});

// @desc    Get pending KYC users
// @route   GET /api/admin/kyc/pending
// @access  Private/Admin
export const getPendingKycUsers = asyncHandler(async (req, res, next) => {
  // Can be 'pending' or 'reviewing' based on business logic. 
  // 'reviewing' means user has submitted docs and is waiting for approval.
  const users = await User.find({ kycStatus: 'reviewing' }).select('-password');
  successResponse(res, 200, 'Pending KYC users retrieved successfully', users);
});

// @desc    Approve KYC
// @route   PUT /api/admin/kyc/:id/approve
// @access  Private/Admin
export const approveKyc = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.kycStatus = 'approved';
  user.isVerified = true;
  // Activate wallet (for example, give a welcome bonus or just ensure it's active)
  if (user.walletBalance === 0) {
     // example starting balance, could remain 0
     // user.walletBalance = 100; 
  }
  
  await user.save();

  successResponse(res, 200, 'User KYC approved successfully', {
    _id: user._id,
    kycStatus: user.kycStatus,
    isVerified: user.isVerified
  });
});

// @desc    Reject KYC
// @route   PUT /api/admin/kyc/:id/reject
// @access  Private/Admin
export const rejectKyc = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.kycStatus = 'rejected';
  user.isVerified = false;
  
  await user.save();

  successResponse(res, 200, 'User KYC rejected', {
    _id: user._id,
    kycStatus: user.kycStatus,
    isVerified: user.isVerified
  });
});
