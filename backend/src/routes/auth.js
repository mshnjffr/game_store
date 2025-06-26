const express = require('express');
const { 
  register, 
  login, 
  logout, 
  getSession 
} = require('../controllers/authController');
const { 
  validateRegister, 
  validateLogin 
} = require('../utils/validation');
const { handleValidationErrors } = require('../middleware/validation');
const { requireAuth, requireGuest } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimit');

const router = express.Router();

// POST /api/auth/register - User registration
router.post('/register', 
  authLimiter,
  requireGuest,
  validateRegister,
  handleValidationErrors,
  register
);

// POST /api/auth/login - User login
router.post('/login',
  authLimiter,
  requireGuest,
  validateLogin,
  handleValidationErrors,
  login
);

// POST /api/auth/logout - User logout
router.post('/logout',
  requireAuth,
  logout
);

// GET /api/auth/session - Check current session
router.get('/session', getSession);

module.exports = router;
