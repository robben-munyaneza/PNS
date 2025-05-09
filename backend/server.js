const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Route imports
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const inventoryRoutes = require('./routes/inventory');
const stockMovementRoutes = require('./routes/stockmovement');

// Routes
app.use('/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/stockmovements', stockMovementRoutes);

// Sync DB and start server
sequelize.sync()  // You can add { force: true } during development to reset DB
  .then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database sync failed:', err.message);
  });
