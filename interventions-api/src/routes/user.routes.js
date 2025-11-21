/**
 * User routes - protected by verifyToken and isAdmin
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { isAdmin } = require('../middlewares');

// `verifyToken` middleware is expected to exist and populate `req.user`
const verifyToken = require('../middlewares/verifyToken');

// All routes protected by verifyToken then isAdmin
router.post('/', verifyToken, isAdmin, userController.createUser);
router.get('/', verifyToken, isAdmin, userController.getAllUsers);
router.get('/:id', verifyToken, isAdmin, userController.getUserById);
router.put('/:id', verifyToken, isAdmin, userController.updateUser);
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
