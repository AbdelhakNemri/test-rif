const express = require('express');
const interventionController = require('../controllers/intervention.controller');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/admin.middleware');

const router = express.Router();

// GET /api/interventions - Liste des interventions (tous les utilisateurs authentifiés)
// Query params: ?statut=En attente&include=true
router.get('/', verifyToken, interventionController.getAllInterventions);

// GET /api/interventions/:id - Détail d'une intervention (tous les utilisateurs authentifiés)
router.get('/:id', verifyToken, interventionController.getInterventionById);

// POST /api/interventions - Créer une intervention (admin uniquement)
router.post('/', verifyToken, isAdmin, interventionController.createIntervention);

// PUT /api/interventions/:id - Modifier une intervention (admin uniquement)
router.put('/:id', verifyToken, isAdmin, interventionController.updateIntervention);

// DELETE /api/interventions/:id - Supprimer une intervention (admin uniquement)
router.delete('/:id', verifyToken, isAdmin, interventionController.deleteIntervention);

module.exports = router;
