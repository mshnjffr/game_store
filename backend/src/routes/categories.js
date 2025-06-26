const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryBySlug,
  getCategoryById
} = require('../controllers/categoriesController');

// Get all categories
router.get('/', getAllCategories);

// Get category by slug
router.get('/slug/:slug', getCategoryBySlug);

// Get category by ID
router.get('/:id', getCategoryById);

module.exports = router;
