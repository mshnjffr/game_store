const prisma = require('../config/prisma');
const inventoryService = require('../services/inventoryService');
const logger = require('../utils/logger');

// Helper function to convert game fields to camelCase for frontend
const convertGameFields = (game) => ({
  id: game.id,
  title: game.title,
  description: game.description,
  price: parseFloat(game.price),
  discountPrice: game.discount_price ? parseFloat(game.discount_price) : null,
  categoryId: game.category_id,
  developer: game.developer,
  publisher: game.publisher,
  releaseDate: game.release_date,
  rating: game.rating || 0,
  platform: game.platform,
  stockQuantity: game.stock_quantity,
  featured: game.featured,
  createdAt: game.created_at,
  updatedAt: game.updated_at,
  category: game.category,
  images: game.images?.map(img => ({
    id: img.id,
    gameId: img.game_id,
    url: img.url,
    altText: img.alt_text,
    isPrimary: img.is_primary,
    createdAt: img.created_at
  })),
  reviews: game.reviews
});

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

    // Calculate average rating for each game and convert field names
    const gamesWithRating = games.map(game => {
      const avgRating = game.reviews.length > 0 
        ? game.reviews.reduce((sum, review) => sum + review.rating, 0) / game.reviews.length 
        : 0;
      
      return convertGameFields({
        ...game,
        rating: avgRating
      });
    });
    
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
          include: { user: { select: { id: true, first_name: true, last_name: true } } },
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

    const gameData = convertGameFields({
      ...game,
      rating: avgRating
    });

    logger.info('Retrieved game by ID', { gameId });
    res.json(gameData);
  } catch (error) {
    logger.error('Failed to get game by ID', { gameId: req.params.id, error: error.message });
    res.status(500).json({ error: 'Failed to retrieve game' });
  }
};

const getGamesByCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const category = await prisma.category.findUnique({
      where: { slug }
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

    // Calculate average rating for each game and convert field names
    const gamesWithRating = games.map(game => {
      const avgRating = game.reviews.length > 0 
        ? game.reviews.reduce((sum, review) => sum + review.rating, 0) / game.reviews.length 
        : 0;
      
      return convertGameFields({
        ...game,
        rating: avgRating
      });
    });

    logger.info('Retrieved games by category', { slug, count: games.length });
    res.json(gamesWithRating);
  } catch (error) {
    logger.error('Failed to get games by category', { slug: req.params.slug, error: error.message });
    res.status(500).json({ error: 'Failed to retrieve games' });
  }
};

const searchGames = async (req, res) => {
  try {
    const { 
      q,           // search query
      category,    // category filter
      minPrice,    // minimum price
      maxPrice,    // maximum price
      rating,      // minimum rating
      platform,    // platform filter
      sortBy = 'title',      // sort field
      order = 'asc',        // sort order
      page = 1,             // pagination
      limit = 12            // results per page
    } = req.query;

    // Build where clause
    let whereClause = {};
    const andConditions = [];

    // Text search across multiple fields
    if (q) {
      andConditions.push({
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
      andConditions.push({ 
        category: { slug: category } 
      });
    }

    // Price range filter
    if (minPrice || maxPrice) {
      const priceConditions = {};
      if (minPrice) priceConditions.gte = parseFloat(minPrice);
      if (maxPrice) priceConditions.lte = parseFloat(maxPrice);
      andConditions.push({ price: priceConditions });
    }

    // Platform filter
    if (platform) {
      andConditions.push({ 
        platform: { contains: platform, mode: 'insensitive' } 
      });
    }

    if (andConditions.length > 0) {
      whereClause.AND = andConditions;
    }

    // Build orderBy clause
    let orderByClause;
    if (sortBy === 'releaseDate') {
      orderByClause = { release_date: order };
    } else if (sortBy === 'price') {
      orderByClause = { price: order };
    } else if (sortBy === 'rating') {
      // For rating, we'll sort after calculating averages
      orderByClause = { title: 'asc' }; // temporary
    } else if (sortBy === 'name') {
      orderByClause = { title: order };
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

    // Calculate average rating for each game and convert field names
    let gamesWithRating = games.map(game => {
      const avgRating = game.reviews.length > 0 
        ? game.reviews.reduce((sum, review) => sum + review.rating, 0) / game.reviews.length 
        : 0;
      
      return convertGameFields({
        ...game,
        rating: avgRating
      });
    });

    // Apply rating filter after calculating averages
    if (rating) {
      gamesWithRating = gamesWithRating.filter(game => game.rating >= parseFloat(rating));
    }

    // Sort by rating if requested
    if (sortBy === 'rating') {
      gamesWithRating.sort((a, b) => {
        return order === 'desc' ? b.rating - a.rating : a.rating - b.rating;
      });
    }

    logger.info('Game search completed', { 
      query: q, 
      category, 
      count: gamesWithRating.length,
      total: totalCount 
    });

    res.json({
      games: gamesWithRating,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
        totalPages: Math.ceil(totalCount / parseInt(limit))
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
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Check if game exists
    const game = await prisma.game.findUnique({
      where: { id: gameId }
    });

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Check if user already reviewed this game
    const existingReview = await prisma.review.findFirst({
      where: {
        user_id: userId,
        game_id: gameId
      }
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this game' });
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        user_id: userId,
        game_id: gameId,
        rating,
        comment: comment || ''
      },
      include: {
        user: {
          select: { id: true, first_name: true, last_name: true }
        }
      }
    });

    logger.info('Review added', { gameId, userId, rating });

    // Convert field names
    const reviewData = {
      id: review.id,
      userId: review.user_id,
      gameId: review.game_id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
      user: review.user
    };

    res.status(201).json(reviewData);
  } catch (error) {
    logger.error('Failed to add review', { 
      gameId: req.params.id, 
      userId: req.session.userId, 
      error: error.message 
    });
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
