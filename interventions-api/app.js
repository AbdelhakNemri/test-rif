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
    const { sequelize } = require('./src/models/sequelize');
    const models = require('./src/models');

    sequelize.sync({ alter: true })
      .then(() => {
        console.log('Database synced successfully');
        app.listen(port, () => {  // ✅ Changed PORT to port
          console.log(`Server listening on http://localhost:${port}`);
        });
      })
      .catch(err => {
        console.error('Database sync error:', err);
      });
  } catch (err) {
    console.warn('Sequelize instance not found, skipping sync:', err.message);
  }
} else {
  // En production, démarrer le serveur sans sync
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});