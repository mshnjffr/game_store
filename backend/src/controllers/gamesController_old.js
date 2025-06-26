const prisma = require('../config/prisma');
const inventoryService = require('../services/inventoryService');
const logger = require('../utils/logger');

const getAllGames = async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        category: true,
        images: { where: { is_primary: true } },
        reviews: { select: { rating: true } }
      },
      orderBy: [
        { featured: 'desc' },
        { title: 'asc' }
      ]
    });

    // Calculate average rating for each game
    const gamesWithRating = games.map(game => ({
      ...game,
      rating: game.reviews.length > 0 
        ? game.reviews.reduce((sum, review) => sum + review.rating, 0) / game.reviews.length 
        : 0,
      price: parseFloat(game.price),
      discount_price: game.discount_price ? parseFloat(game.discount_price) : null
    }));
    
    logger.info('Retrieved all games', { count: games.length });
    
    res.json({
      games: gamesWithRating,
      total: games.length
    });
  } catch (error) {
    logger.error('Failed to get all games', { error: error.message });
    res.status(500).json({ error: 'Failed to retrieve games' });
  }
};

const getGameById = async (req, res) => {
  try {
    const gameId = parseInt(req.params.id);
    
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        category: true,
        images: true,
        reviews: {
          include: {
            user: {
              select: { first_name: true, last_name: true }
            }
          },
          orderBy: { created_at: 'desc' }
        }
      }
    });
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Calculate average rating
    const avgRating = game.reviews.length > 0 
      ? game.reviews.reduce((sum, review) => sum + review.rating, 0) / game.reviews.length 
      : 0;

    // Add stock information
    const stockLevel = await inventoryService.getStockLevel(gameId);
    
    const gameWithStock = {
      ...game,
      rating: avgRating,
      price: parseFloat(game.price),
      discount_price: game.discount_price ? parseFloat(game.discount_price) : null,
      stock_quantity: stockLevel,
      in_stock: stockLevel > 0
    };

    logger.info('Retrieved game by ID', { gameId, title: game.title });
    
    res.json(gameWithStock);
  } catch (error) {
    logger.error('Failed to get game by ID', { error: error.message, gameId: req.params.id });
    res.status(500).json({ error: 'Failed to retrieve game' });
  }
};

const getGamesByCategory = async (req, res) => {
  try {
    const categorySlug = req.params.slug;
    
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug }
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const games = await prisma.game.findMany({
      where: { category_id: category.id },
      include: {
        category: true,
        images: { where: { is_primary: true } },
        reviews: { select: { rating: true } }
      },
      orderBy: [
        { featured: 'desc' },
        { title: 'asc' }
      ]
    });

    // Calculate average rating for each game
    const gamesWithRating = games.map(game => ({
      ...game,
      rating: game.reviews.length > 0 
        ? game.reviews.reduce((sum, review) => sum + review.rating, 0) / game.reviews.length 
        : 0,
      price: parseFloat(game.price),
      discount_price: game.discount_price ? parseFloat(game.discount_price) : null
    }));

    logger.info('Retrieved games by category', { categorySlug, count: games.length });
    
    res.json({
      category,
      games: gamesWithRating,
      total: games.length
    });
  } catch (error) {
    logger.error('Failed to get games by category', { error: error.message, categorySlug: req.params.slug });
    res.status(500).json({ error: 'Failed to retrieve category games' });
  }
};

const searchGames = async (req, res) => {
  try {
    const {
      q = '',
      category,
      minPrice,
      maxPrice,
      rating,
      platform,
      sortBy = 'title',
      order = 'asc',
      page = 1,
      limit = 10
    } = req.query;

    // Build where clause
    const whereClause = {
      AND: []
    };

    // Text search across multiple fields
    if (q) {
      whereClause.AND.push({
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { developer: { contains: q, mode: 'insensitive' } },
          { publisher: { contains: q, mode: 'insensitive' } }
        ]
      });
    }

    // Category filter
    if (category) {
      whereClause.AND.push({
        category: { slug: category }
      });
    }

    // Price range filter
    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) priceFilter.gte = parseFloat(minPrice);
      if (maxPrice) priceFilter.lte = parseFloat(maxPrice);
      whereClause.AND.push({ price: priceFilter });
    }

    // Platform filter
    if (platform) {
      whereClause.AND.push({
        platform: { contains: platform, mode: 'insensitive' }
      });
    }

    // Remove empty AND array if no filters
    if (whereClause.AND.length === 0) {
      delete whereClause.AND;
    }

    // Build orderBy clause
    let orderByClause = {};
    if (sortBy === 'price') {
      orderByClause = { price: order };
    } else if (sortBy === 'title') {
      orderByClause = { title: order };
    } else if (sortBy === 'release_date') {
      orderByClause = { release_date: order };
    } else if (sortBy === 'featured') {
      orderByClause = { featured: order };
    } else {
      orderByClause = { [sortBy]: order };
    }

    // Get games with pagination and includes
    const games = await prisma.game.findMany({
      where: whereClause,
      include: {
        category: true,
        images: { where: { is_primary: true } },
        reviews: { select: { rating: true } }
      },
      orderBy: orderByClause,
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit)
    });

    // Get total count for pagination
    const totalCount = await prisma.game.count({ where: whereClause });

    // Calculate average rating for each game and apply rating filter if needed
    let gamesWithRating = games.map(game => ({
      ...game,
      rating: game.reviews.length > 0 
        ? game.reviews.reduce((sum, review) => sum + review.rating, 0) / game.reviews.length 
        : 0,
      price: parseFloat(game.price),
      discount_price: game.discount_price ? parseFloat(game.discount_price) : null
    }));

    // Apply rating filter after calculating ratings (since we can't easily filter by calculated field in Prisma)
    if (rating !== undefined) {
      gamesWithRating = gamesWithRating.filter(game => game.rating >= parseFloat(rating));
    }

    logger.info('Games search completed', { 
      query: q, 
      category, 
      totalResults: gamesWithRating.length,
      page: parseInt(page),
      limit: parseInt(limit)
    });

    res.json({
      games: gamesWithRating,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: rating !== undefined ? gamesWithRating.length : totalCount,
        totalPages: Math.ceil((rating !== undefined ? gamesWithRating.length : totalCount) / parseInt(limit))
      },
      filters: {
        q,
        category,
        minPrice,
        maxPrice,
        rating,
        platform,
        sortBy,
        order
      }
    });
  } catch (error) {
    logger.error('Game search failed', { error: error.message });
    res.status(500).json({ error: 'Search failed' });
  }
};

const addGameReview = async (req, res) => {
  try {
    const gameId = parseInt(req.params.id);
    const { rating, comment } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Must be logged in to leave a review' });
    }

    // Check if game exists
    const game = await prisma.game.findUnique({
      where: { id: gameId }
    });

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Check if user already reviewed this game
    const existingReview = await prisma.review.findUnique({
      where: {
        user_id_game_id: {
          user_id: userId,
          game_id: gameId
        }
      }
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this game' });
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        user_id: userId,
        game_id: gameId,
        rating: parseInt(rating),
        comment: comment || ''
      },
      include: {
        user: {
          select: { first_name: true, last_name: true }
        }
      }
    });

    logger.info('Review added to game', { gameId, userId, rating });

    res.status(201).json({
      message: 'Review added successfully',
      review: {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        user: review.user,
        created_at: review.created_at
      }
    });
  } catch (error) {
    logger.error('Failed to add review', { error: error.message, gameId: req.params.id });
    res.status(500).json({ error: 'Failed to add review' });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  getGamesByCategory,
  searchGames,
  addGameReview
};
