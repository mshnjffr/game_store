const { body, query, param } = require('express-validator');

// User validation rules
const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Game validation rules
const validateGameId = [
  param('id')
    .isNumeric()
    .withMessage('Game ID must be a number')
];

const validateGameSearch = [
  query('q').optional().trim().isLength({ max: 100 }),
  query('category').optional().trim().isLength({ max: 50 }),
  query('minPrice').optional().isNumeric().withMessage('Min price must be a number'),
  query('maxPrice').optional().isNumeric().withMessage('Max price must be a number'),
  query('rating').optional().isNumeric().withMessage('Rating must be a number'),
  query('platform').optional().trim().isLength({ max: 50 }),
  query('sortBy').optional().isIn(['name', 'price', 'rating', 'release_date']),
  query('order').optional().isIn(['asc', 'desc']),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
];

// Review validation rules
const validateReview = [
  param('id').isNumeric().withMessage('Game ID must be a number'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment must be less than 500 characters')
];

// Order validation rules
const validateCreateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.gameId')
    .isNumeric()
    .withMessage('Game ID must be a number'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('shippingAddress')
    .notEmpty()
    .trim()
    .withMessage('Shipping address is required')
];

const validateOrderId = [
  param('id')
    .isNumeric()
    .withMessage('Order ID must be a number')
];

module.exports = {
  validateRegister,
  validateLogin,
  validateGameId,
  validateGameSearch,
  validateReview,
  validateCreateOrder,
  validateOrderId
};
