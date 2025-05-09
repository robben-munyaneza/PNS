const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/InventoryController');

router.post('/', inventoryController.createInventory);
router.get('/', inventoryController.getAllInventories);
router.get('/:id', inventoryController.getInventoryById);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;
