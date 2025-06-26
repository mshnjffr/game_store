const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    logger.info('Retrieved all categories', { count: categories.length });
    res.json(categories);
  } catch (error) {
    logger.error('Failed to get all categories', { error: error.message });
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Get category by slug
const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const category = await prisma.category.findUnique({
      where: { slug }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    logger.info('Retrieved category by slug', { slug, categoryId: category.id });
    res.json(category);
  } catch (error) {
    logger.error('Failed to get category by slug', { 
      slug: req.params.slug, 
      error: error.message 
    });
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryId = parseInt(id);

    if (isNaN(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }
    
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    logger.info('Retrieved category by ID', { categoryId });
    res.json(category);
  } catch (error) {
    logger.error('Failed to get category by ID', { 
      categoryId: req.params.id, 
      error: error.message 
    });
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryBySlug,
  getCategoryById
};
