const express = require('express');
const {
  getAllGames,
  getGameById,
  getGamesByCategory,
  searchGames,
  addGameReview
} = require('../controllers/gamesController');
const {
  validateGameId,
  validateGameSearch,
  validateReview
} = require('../utils/validation');
const { handleValidationErrors } = require('../middleware/validation');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/games - Get all games
router.get('/', getAllGames);

// GET /api/games/search - Search games with filters
router.get('/search',
  validateGameSearch,
  handleValidationErrors,
  searchGames
);

// GET /api/games/category/:slug - Get games by category
router.get('/category/:slug', getGamesByCategory);

// GET /api/games/:id - Get game by ID
router.get('/:id',
  validateGameId,
  handleValidationErrors,
  getGameById
);

// POST /api/games/:id/reviews - Add game review (requires auth)
router.post('/:id/reviews',
  requireAuth,
  validateReview,
  handleValidationErrors,
  addGameReview
);

module.exports = router;
