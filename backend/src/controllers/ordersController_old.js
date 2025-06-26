const inventoryService = require('../services/inventoryService');
const logger = require('../utils/logger');

// Mock orders database - will be replaced with Prisma
const orders = new Map();
let nextOrderId = 1;

// Mock games reference (shared with gamesController)
const games = new Map([
  [1, { id: 1, title: 'Minecraft', price: 26.95 }],
  [2, { id: 2, title: 'Fortnite', price: 0.00 }],
  [3, { id: 3, title: 'Counter-Strike 2', price: 0.00 }],
  [4, { id: 4, title: 'Call of Duty: Black Ops 6', price: 69.99, discount_price: 59.99 }],
  [5, { id: 5, title: 'ROBLOX', price: 0.00 }]
]);

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    const userId = req.session.userId;

    // Validate all items exist and are in stock
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const game = games.get(item.gameId);
      if (!game) {
        return res.status(400).json({ 
          error: `Game with ID ${item.gameId} not found` 
        });
      }

      // Check stock availability
      const availability = await inventoryService.checkAvailability(item.gameId, item.quantity);
      if (!availability.available) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${game.title}. Available: ${availability.currentStock}, Requested: ${item.quantity}` 
        });
      }

      const price = game.discount_price || game.price;
      const itemTotal = price * item.quantity;
      
      orderItems.push({
        id: Date.now() + Math.random(),
        game_id: item.gameId,
        game: game,
        quantity: item.quantity,
        price: price,
        total: itemTotal
      });

      totalAmount += itemTotal;
    }

    // Reserve stock for all items
    const reservations = [];
    try {
      for (const item of orderItems) {
        const reservation = await inventoryService.reserveStock(item.game_id, item.quantity);
        reservations.push(reservation);
      }
    } catch (error) {
      // If any reservation fails, release already reserved stock
      for (const reservation of reservations) {
        await inventoryService.releaseStock(reservation.gameId, reservation.reserved);
      }
      return res.status(400).json({ error: error.message });
    }

    // Create order
    const order = {
      id: nextOrderId++,
      user_id: userId,
      items: orderItems,
      total_amount: totalAmount,
      status: 'pending',
      shipping_address: shippingAddress,
      created_at: new Date(),
      updated_at: new Date()
    };

    orders.set(order.id, order);

    // Confirm stock reduction (mark as sold)
    for (const item of orderItems) {
      await inventoryService.confirmStock(item.game_id, item.quantity);
    }

    logger.info('Order created successfully', { 
      orderId: order.id, 
      userId, 
      totalAmount, 
      itemCount: orderItems.length 
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        items: order.items.map(item => ({
          gameId: item.game_id,
          title: item.game.title,
          quantity: item.quantity,
          price: item.price,
          total: item.total
        })),
        totalAmount: order.total_amount,
        status: order.status,
        createdAt: order.created_at
      }
    });
  } catch (error) {
    logger.error('Order creation failed', { error: error.message, userId: req.session.userId });
    res.status(500).json({ error: 'Order creation failed' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.session.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Get user's orders
    const userOrders = Array.from(orders.values()).filter(order => order.user_id === userId);
    
    // Sort by creation date (newest first)
    userOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = userOrders.slice(startIndex, endIndex);

    const ordersResponse = paginatedOrders.map(order => ({
      id: order.id,
      items: order.items.map(item => ({
        gameId: item.game_id,
        title: item.game.title,
        quantity: item.quantity,
        price: item.price,
        total: item.total
      })),
      totalAmount: order.total_amount,
      status: order.status,
      shippingAddress: order.shipping_address,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    }));

    logger.info('Retrieved user orders', { userId, count: paginatedOrders.length });

    res.json({
      orders: ordersResponse,
      pagination: {
        page,
        limit,
        total: userOrders.length,
        totalPages: Math.ceil(userOrders.length / limit)
      }
    });
  } catch (error) {
    logger.error('Failed to get user orders', { error: error.message, userId: req.session.userId });
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const userId = req.session.userId;
    
    const order = orders.get(orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if order belongs to the user
    if (order.user_id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const orderResponse = {
      id: order.id,
      items: order.items.map(item => ({
        gameId: item.game_id,
        title: item.game.title,
        quantity: item.quantity,
        price: item.price,
        total: item.total
      })),
      totalAmount: order.total_amount,
      status: order.status,
      shippingAddress: order.shipping_address,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    };

    logger.info('Retrieved order by ID', { orderId, userId });

    res.json(orderResponse);
  } catch (error) {
    logger.error('Failed to get order by ID', { error: error.message, orderId: req.params.id });
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;
    const userId = req.session.userId;

    const order = orders.get(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if order belongs to the user
    if (order.user_id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Validate status
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Update order
    order.status = status;
    order.updated_at = new Date();

    // If cancelling, release stock
    if (status === 'cancelled' && order.status !== 'cancelled') {
      for (const item of order.items) {
        await inventoryService.releaseStock(item.game_id, item.quantity);
      }
    }

    logger.info('Order status updated', { orderId, newStatus: status, userId });

    res.json({
      message: 'Order status updated successfully',
      order: {
        id: order.id,
        status: order.status,
        updatedAt: order.updated_at
      }
    });
  } catch (error) {
    logger.error('Failed to update order status', { error: error.message, orderId: req.params.id });
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

const getOrderStats = async (req, res) => {
  try {
    const userId = req.session.userId;
    const userOrders = Array.from(orders.values()).filter(order => order.user_id === userId);

    const stats = {
      totalOrders: userOrders.length,
      totalSpent: userOrders.reduce((sum, order) => sum + order.total_amount, 0),
      statusBreakdown: {
        pending: userOrders.filter(order => order.status === 'pending').length,
        processing: userOrders.filter(order => order.status === 'processing').length,
        shipped: userOrders.filter(order => order.status === 'shipped').length,
        delivered: userOrders.filter(order => order.status === 'delivered').length,
        cancelled: userOrders.filter(order => order.status === 'cancelled').length
      },
      averageOrderValue: userOrders.length > 0 ? 
        userOrders.reduce((sum, order) => sum + order.total_amount, 0) / userOrders.length : 0
    };

    logger.info('Retrieved order stats', { userId, totalOrders: stats.totalOrders });

    res.json(stats);
  } catch (error) {
    logger.error('Failed to get order stats', { error: error.message, userId: req.session.userId });
    res.status(500).json({ error: 'Failed to retrieve order statistics' });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getOrderStats
};
