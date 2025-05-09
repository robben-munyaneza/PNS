const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

// Create inventory
exports.createInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);
    res.status(201).json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create inventory', error: err.message });
  }
};

// Get all inventories with products
exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.findAll({ include: Product });
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch inventories', error: err.message });
  }
};

// Get inventory by ID
exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id, { include: Product });
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch inventory', error: err.message });
  }
};

// Update inventory
exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
    await inventory.update(req.body);
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update inventory', error: err.message });
  }
};

// Delete inventory
exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
    await inventory.destroy();
    res.json({ message: 'Inventory deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete inventory', error: err.message });
  }
};

// ✅ Get low stock items (e.g., quantity < 5)
exports.getLowStockItems = async (req, res) => {
  try {
    const lowStockItems = await Inventory.findAll({
      where: { quantity: { [require('sequelize').Op.lt]: 5 } },
      include: Product
    });
    res.json(lowStockItems);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch low stock items', error: err.message });
  }
};

// ✅ Get total inventory value (quantity * product.price)
exports.getTotalInventoryValue = async (req, res) => {
  try {
    const inventories = await Inventory.findAll({ include: Product });
    const totalValue = inventories.reduce((sum, item) => {
      const price = item.Product?.price || 0;
      return sum + (item.quantity * price);
    }, 0);
    res.json({ totalValue });
  } catch (err) {
    res.status(500).json({ message: 'Failed to calculate total inventory value', error: err.message });
  }
};
