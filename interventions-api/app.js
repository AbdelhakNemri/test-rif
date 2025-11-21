const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Simple logger middleware from `src/middlewares`
try {
  const { logger } = require('./src/middlewares');
  if (logger) app.use(logger);
} catch (err) {
  // middleware not present yet
}

// Mount routes from `src/routes`
try {
  const routes = require('./src/routes');
  app.use('/api', routes);
} catch (err) {
  // routes not present yet
}

// Sync Sequelize models to DB in development
if (process.env.NODE_ENV !== 'production') {
  try {
    // requires your Sequelize instance file created earlier
    const { sequelize } = require('./src/models/sequelize');
    sequelize.sync({ alter: true }) // or { force: true } to drop/recreate (dangerous)
      .then(() => console.log('Database synced (dev: alter true)'))
      .catch(err => console.error('Sequelize sync error:', err));
  } catch (err) {
    console.warn('Sequelize instance not found, skipping sync:', err.message);
  }
}

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});