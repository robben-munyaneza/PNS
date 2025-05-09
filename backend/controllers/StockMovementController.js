const StockMovement = require('../models/StockMovement');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

// Create stock movement
exports.createStockMovement = async (req, res) => {
  try {
    const stock = await StockMovement.create(req.body);
    Inventory.update({where: {productId: req.body.productId}}, {quantity: req.body.quantity});
    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create stock movement', error: err.message });
  }
};

// Get all stock movements
exports.getAllStockMovements = async (req, res) => {
  try {
    const stocks = await StockMovement.findAll({ include: Product });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stock movements', error: err.message });
  }
};

// Get stock movement by ID
exports.getStockMovementById = async (req, res) => {
  try {
    const stock = await StockMovement.findByPk(req.params.id, { include: Product });
    if (!stock) return res.status(404).json({ message: 'Stock movement not found' });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stock movement', error: err.message });
  }
};

// Update stock movement
exports.updateStockMovement = async (req, res) => {
  try {
    const stock = await StockMovement.findByPk(req.params.id);
    if (!stock) return res.status(404).json({ message: 'Stock movement not found' });
    await stock.update(req.body);
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update stock movement', error: err.message });
  }
};

// Delete stock movement
exports.deleteStockMovement = async (req, res) => {
  try {
    const stock = await StockMovement.findByPk(req.params.id);
    if (!stock) return res.status(404).json({ message: 'Stock movement not found' });
    await stock.destroy();
    res.json({ message: 'Stock movement deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete stock movement', error: err.message });
  }
};
