class InventoryService {
  constructor() {
    // In-memory inventory tracking for demo purposes
    // This will be replaced with Prisma database queries
    this.inventory = new Map();
  }

  async checkAvailability(gameId, quantity = 1) {
    // Placeholder implementation - will use Prisma when connected
    try {
      const available = this.inventory.get(gameId) || 999; // Default high stock
      return {
        available: available >= quantity,
        currentStock: available,
        requested: quantity
      };
    } catch (error) {
      throw new Error(`Inventory check failed: ${error.message}`);
    }
  }

  async reserveStock(gameId, quantity = 1) {
    try {
      const current = this.inventory.get(gameId) || 999;
      if (current < quantity) {
        throw new Error('Insufficient stock');
      }
      
      this.inventory.set(gameId, current - quantity);
      return {
        reserved: quantity,
        remainingStock: current - quantity,
        reservationId: `res_${gameId}_${Date.now()}`
      };
    } catch (error) {
      throw new Error(`Stock reservation failed: ${error.message}`);
    }
  }

  async releaseStock(gameId, quantity = 1) {
    try {
      const current = this.inventory.get(gameId) || 0;
      this.inventory.set(gameId, current + quantity);
      return {
        released: quantity,
        newStock: current + quantity
      };
    } catch (error) {
      throw new Error(`Stock release failed: ${error.message}`);
    }
  }

  async confirmStock(gameId, quantity = 1) {
    // Mark stock as permanently sold
    try {
      return {
        confirmed: quantity,
        gameId,
        timestamp: new Date()
      };
    } catch (error) {
      throw new Error(`Stock confirmation failed: ${error.message}`);
    }
  }

  async getStockLevel(gameId) {
    try {
      return this.inventory.get(gameId) || 999;
    } catch (error) {
      throw new Error(`Stock level check failed: ${error.message}`);
    }
  }

  async bulkCheckAvailability(items) {
    try {
      const results = [];
      for (const item of items) {
        const availability = await this.checkAvailability(item.gameId, item.quantity);
        results.push({
          ...item,
          ...availability
        });
      }
      return results;
    } catch (error) {
      throw new Error(`Bulk availability check failed: ${error.message}`);
    }
  }

  async updateStock(gameId, newQuantity) {
    try {
      const previous = this.inventory.get(gameId) || 0;
      this.inventory.set(gameId, newQuantity);
      return {
        gameId,
        previousStock: previous,
        newStock: newQuantity,
        change: newQuantity - previous
      };
    } catch (error) {
      throw new Error(`Stock update failed: ${error.message}`);
    }
  }

  // Initialize default stock levels for games
  initializeStock() {
    const defaultGames = [
      { id: 1, stock: 100 }, // Minecraft
      { id: 2, stock: 75 },  // Fortnite
      { id: 3, stock: 50 },  // Counter-Strike 2
      { id: 4, stock: 80 },  // Call of Duty
      { id: 5, stock: 90 },  // ROBLOX
      { id: 6, stock: 60 },  // Monster Hunter
      { id: 7, stock: 70 },  // Ghost of Yotei
      { id: 8, stock: 40 },  // GTA 6
      { id: 9, stock: 85 },  // Mario Kart
      { id: 10, stock: 65 }  // Phasmophobia
    ];

    defaultGames.forEach(game => {
      this.inventory.set(game.id, game.stock);
    });

    console.log('Inventory initialized with default stock levels');
  }
}

module.exports = new InventoryService();
