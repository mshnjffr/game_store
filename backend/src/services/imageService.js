const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');

class ImageService {
  constructor() {
    this.imagesDir = path.join(__dirname, '../../images');
    this.tempDir = path.join(this.imagesDir, 'temp');
    this.gamesDir = path.join(this.imagesDir, 'games');
    this.categoriesDir = path.join(this.imagesDir, 'categories');
    
    this.initDirectories();
  }

  async initDirectories() {
    try {
      await fs.mkdir(this.imagesDir, { recursive: true });
      await fs.mkdir(this.tempDir, { recursive: true });
      await fs.mkdir(this.gamesDir, { recursive: true });
      await fs.mkdir(this.categoriesDir, { recursive: true });
    } catch (error) {
      console.error('Error creating image directories:', error);
    }
  }

  async processGameImage(file, gameId, imageType = 'cover') {
    try {
      const filename = `${gameId}-${imageType}.jpg`;
      const filepath = path.join(this.gamesDir, filename);

      // Process image with Sharp
      await sharp(file.buffer)
        .resize(800, 600, { 
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 85 })
        .toFile(filepath);

      // Generate thumbnail
      const thumbnailFilename = `${gameId}-${imageType}-thumb.jpg`;
      const thumbnailPath = path.join(this.gamesDir, thumbnailFilename);
      
      await sharp(file.buffer)
        .resize(300, 225, { 
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 80 })
        .toFile(thumbnailPath);

      return {
        url: `/images/games/${filename}`,
        thumbnailUrl: `/images/games/${thumbnailFilename}`,
        filename,
        size: file.size
      };
    } catch (error) {
      throw new Error(`Image processing failed: ${error.message}`);
    }
  }

  async processCategoryImage(file, categoryId) {
    try {
      const filename = `${categoryId}.jpg`;
      const filepath = path.join(this.categoriesDir, filename);

      await sharp(file.buffer)
        .resize(400, 300, { 
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 85 })
        .toFile(filepath);

      return {
        url: `/images/categories/${filename}`,
        filename,
        size: file.size
      };
    } catch (error) {
      throw new Error(`Category image processing failed: ${error.message}`);
    }
  }

  async deleteImage(imagePath) {
    try {
      const fullPath = path.join(this.imagesDir, imagePath);
      await fs.unlink(fullPath);
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }

  validateImageFile(file) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
    }

    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 5MB.');
    }

    return true;
  }

  getImagePath(gameId, imageType = 'cover') {
    return `/images/games/${gameId}-${imageType}.jpg`;
  }

  getCategoryImagePath(categoryId) {
    return `/images/categories/${categoryId}.jpg`;
  }
}

module.exports = new ImageService();
