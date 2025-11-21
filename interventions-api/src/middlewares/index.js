// Example middleware exports
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

let isAdmin;
try {
  isAdmin = require('./admin.middleware');
} catch (err) {
  // admin.middleware may not exist in some setups; keep undefined
}

module.exports = {
  logger,
  isAdmin,
};
