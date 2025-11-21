/**
 * src/routes/commune.routes.js
 *
 * Defines protected CRUD routes for Commune resource. All routes are protected
 * by `verifyToken` and `isAdmin` middlewares.
 */
const express = require('express');
const router = express.Router();
const communeController = require('../controllers/commune.controller');
const { isAdmin } = require('../middlewares');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, isAdmin, communeController.createCommune);
router.get('/', verifyToken, isAdmin, communeController.getAllCommunes);
router.get('/:id', verifyToken, isAdmin, communeController.getCommuneById);
router.put('/:id', verifyToken, isAdmin, communeController.updateCommune);
router.delete('/:id', verifyToken, isAdmin, communeController.deleteCommune);

module.exports = router;
