const express = require('express');
const themeController = require('../controllers/theme.controller');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/admin.middleware');

const router = express.Router();

// GET /api/themes - Liste des thèmes (accessible à tous les utilisateurs authentifiés)
router.get('/', verifyToken, themeController.getAllThemes);

// GET /api/themes/:id - Détail d'un thème (accessible à tous les utilisateurs authentifiés)
router.get('/:id', verifyToken, themeController.getThemeById);

// POST /api/themes - Créer un thème (admin uniquement)
router.post('/', verifyToken, isAdmin, themeController.createTheme);

// PUT /api/themes/:id - Modifier un thème (admin uniquement)
router.put('/:id', verifyToken, isAdmin, themeController.updateTheme);

// DELETE /api/themes/:id - Supprimer un thème (admin uniquement)
router.delete('/:id', verifyToken, isAdmin, themeController.deleteTheme);

module.exports = router;
