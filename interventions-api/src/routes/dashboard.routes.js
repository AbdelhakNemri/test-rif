/**
 * src/routes/dashboard.routes.js
 *
 * Protected route for admin dashboard stats. GET /
 */
const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares');
const verifyToken = require('../middlewares/verifyToken');
const dashboardController = require('../controllers/dashboard.controller');

router.get('/', verifyToken, isAdmin, dashboardController.getDashboard);

module.exports = router;
