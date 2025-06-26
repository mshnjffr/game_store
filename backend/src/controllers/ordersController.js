const prisma = require('../config/prisma');
const inventoryService = require('../services/inventoryService');
const logger = require('../utils/logger');

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Must be logged in to create an order' });
    }

    // Validate all items exist
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const game = await prisma.game.findUnique({
        where: { id: item.gameId }
      });
      
      if (!game) {
        return res.status(400).json({ 
          error: `Game with ID ${item.gameId} not found` 
        });
      }

      const price = game.discount_price ? parseFloat(game.discount_price) : parseFloat(game.price);
      const itemTotal = price * item.quantity;
      
      orderItems.push({
        game_id: item.gameId,
        game: game,
        quantity: item.quantity,
        price: price,
        total: itemTotal
      });

      totalAmount += itemTotal;
    }

    // Create order using Prisma transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          user_id: userId,
          total_amount: totalAmount,
          status: 'PENDING',
          shipping_address: typeof shippingAddress === 'string' ? shippingAddress : JSON.stringify(shippingAddress)
        }
      });

      // Create order items
      const items = await Promise.all(orderItems.map(item => 
        tx.orderItem.create({
          data: {
            order_id: newOrder.id,
            game_id: item.game_id,
            quantity: item.quantity,
            price: item.price
          }
        })
      ));

      return { ...newOrder, items };
    });

    logger.info('Order created successfully', { 
      orderId: order.id, 
      userId, 
      totalAmount, 
      itemCount: orderItems.length 
    });

    res.status(201).json({
      id: order.id,
      items: orderItems.map(item => ({
        gameId: item.game_id,
        title: item.game.title,
        quantity: item.quantity,
        price: item.price,
        total: item.total
      })),
      totalAmount: order.total_amount,
      status: order.status,
      createdAt: order.created_at
    });
  } catch (error) {
    logger.error('Order creation failed', { error: error.message, userId: req.session.userId });
    console.error('Full error:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: `Order creation failed: ${error.message}` });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.session.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!userId) {
      return res.status(401).json({ error: 'Must be logged in to view orders' });
    }

    // Get user's orders with items and games
    const orders = await prisma.order.findMany({
      where: { user_id: userId },
      include: {
        items: {
          include: {
            game: true
          }
        }
      },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    // Get total count for pagination
    const totalCount = await prisma.order.count({
      where: { user_id: userId }
    });

    const ordersResponse = orders.map(order => ({
      id: order.id,
      items: order.items.map(item => ({
        gameId: item.game_id,
        title: item.game.title,
        quantity: item.quantity,
        price: parseFloat(item.price),
        total: parseFloat(item.price) * item.quantity
      })),
      totalAmount: parseFloat(order.total_amount),
      status: order.status,
      shippingAddress: order.shipping_address,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    }));

    logger.info('Retrieved user orders', { userId, count: orders.length });

    res.json({
      orders: ordersResponse,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
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

    if (!userId) {
      return res.status(401).json({ error: 'Must be logged in to view order' });
    }
    
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            game: true
          }
        }
      }
    });
    
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
        price: parseFloat(item.price),
        total: parseFloat(item.price) * item.quantity
      })),
      totalAmount: parseFloat(order.total_amount),
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

    if (!userId) {
      return res.status(401).json({ error: 'Must be logged in to update order' });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            game: true
          }
        }
      }
    });

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
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: status,
        updated_at: new Date()
      }
    });

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
        id: updatedOrder.id,
        status: updatedOrder.status,
        updatedAt: updatedOrder.updated_at
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

    if (!userId) {
      return res.status(401).json({ error: 'Must be logged in to view order stats' });
    }

    const orders = await prisma.order.findMany({
      where: { user_id: userId }
    });

    const stats = {
      totalOrders: orders.length,
      totalSpent: orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0),
      statusBreakdown: {
        pending: orders.filter(order => order.status === 'pending').length,
        processing: orders.filter(order => order.status === 'processing').length,
        shipped: orders.filter(order => order.status === 'shipped').length,
        delivered: orders.filter(order => order.status === 'delivered').length,
        cancelled: orders.filter(order => order.status === 'cancelled').length
      },
      averageOrderValue: orders.length > 0 ? 
        orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0) / orders.length : 0
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
