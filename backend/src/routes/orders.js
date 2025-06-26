const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getOrderStats
} = require('../controllers/ordersController');
const {
  validateCreateOrder,
  validateOrderId
} = require('../utils/validation');
const { handleValidationErrors } = require('../middleware/validation');
const { requireAuth } = require('../middleware/auth');
const { orderLimiter } = require('../middleware/rateLimit');

const router = express.Router();

// All order routes require authentication
router.use(requireAuth);

// POST /api/orders - Create new order
router.post('/',
  orderLimiter,
  validateCreateOrder,
  handleValidationErrors,
  createOrder
);

// GET /api/orders - Get user's orders
router.get('/', getUserOrders);

// GET /api/orders/stats - Get user's order statistics
router.get('/stats', getOrderStats);

// GET /api/orders/:id - Get order by ID
router.get('/:id',
  validateOrderId,
  handleValidationErrors,
  getOrderById
);

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status',
  validateOrderId,
  handleValidationErrors,
  updateOrderStatus
);

module.exports = router;
