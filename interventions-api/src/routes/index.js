const express = require('express');
const router = express.Router();

// Mount sub-routers
router.use('/auth', require('./auth.routes'));
router.use('/users', require('./user.routes'));
router.use('/communes', require('./commune.routes'));
router.use('/dashboard', require('./dashboard.routes'));

// Keep example hello if available
try {
	const controller = require('../controllers');
	if (controller && controller.hello) router.get('/hello', controller.hello);
} catch (err) {
	// ignore
}

module.exports = router;
