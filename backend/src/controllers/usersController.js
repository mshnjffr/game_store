const { hashPassword } = require('../utils/encryption');
const logger = require('../utils/logger');

// Mock users database - shared with authController
const users = new Map();

const getUserProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info('Retrieved user profile', { userId });

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    });
  } catch (error) {
    logger.error('Failed to get user profile', { error: error.message, userId: req.session.userId });
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { firstName, lastName } = req.body;
    
    const user = users.get(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    user.updated_at = new Date();

    logger.info('User profile updated', { userId });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        updatedAt: user.updated_at
      }
    });
  } catch (error) {
    logger.error('Failed to update user profile', { error: error.message, userId: req.session.userId });
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { currentPassword, newPassword } = req.body;
    
    const user = users.get(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { comparePassword } = require('../utils/encryption');
    
    // Verify current password
    const isValidPassword = await comparePassword(currentPassword, user.password_hash);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);
    
    // Update password
    user.password_hash = hashedNewPassword;
    user.updated_at = new Date();

    logger.info('User password changed', { userId });

    res.json({
      message: 'Password changed successfully'
    });
  } catch (error) {
    logger.error('Failed to change password', { error: error.message, userId: req.session.userId });
    res.status(500).json({ error: 'Failed to change password' });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.session.userId;
    
    const user = users.get(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // In a real application, you would:
    // 1. Cancel any pending orders
    // 2. Delete associated data (reviews, etc.)
    // 3. Mark account as deleted rather than actually deleting
    
    users.delete(userId);
    
    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        logger.error('Failed to destroy session during account deletion', { error: err.message, userId });
      }
    });

    logger.info('User account deleted', { userId });

    res.json({
      message: 'Account deleted successfully'
    });
  } catch (error) {
    logger.error('Failed to delete user account', { error: error.message, userId: req.session.userId });
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

const getUserStats = async (req, res) => {
  try {
    const userId = req.session.userId;
    
    // This would typically involve complex queries across multiple tables
    // For now, return basic stats
    const stats = {
      totalOrders: 0,
      totalSpent: 0.00,
      gamesOwned: 0,
      reviewsWritten: 0,
      accountAge: Date.now() - new Date(users.get(userId)?.created_at || Date.now()),
      lastLogin: new Date()
    };

    logger.info('Retrieved user stats', { userId });

    res.json(stats);
  } catch (error) {
    logger.error('Failed to get user stats', { error: error.message, userId: req.session.userId });
    res.status(500).json({ error: 'Failed to retrieve user statistics' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteUserAccount,
  getUserStats
};
