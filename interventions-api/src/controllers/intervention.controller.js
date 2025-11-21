/**
 * Intervention controller - handles HTTP requests/responses
 */
const interventionService = require('../services/intervention.service');

async function createIntervention(req, res) {
  try {
    const payload = req.body;
    const created = await interventionService.createIntervention(payload);
    return res.status(201).json(created);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Erreur serveur' });
  }
}

async function getAllInterventions(req, res) {
  try {
    const filters = {
      statut: req.query.statut,
      includeRelations: req.query.include === 'true'
    };
    const interventions = await interventionService.getAllInterventions(filters);
    return res.status(200).json(interventions);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

async function getInterventionById(req, res) {
  try {
    const id = req.params.id;
    const intervention = await interventionService.getInterventionById(id);
    if (!intervention) return res.status(404).json({ message: 'Intervention non trouvée' });
    return res.status(200).json(intervention);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

async function updateIntervention(req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updated = await interventionService.updateIntervention(id, updateData);
    if (!updated) return res.status(404).json({ message: 'Intervention non trouvée' });
    return res.status(200).json(updated);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Erreur serveur' });
  }
}

async function deleteIntervention(req, res) {
  try {
    const id = req.params.id;
    const deleted = await interventionService.deleteIntervention(id);
    if (!deleted) return res.status(404).json({ message: 'Intervention non trouvée' });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

module.exports = {
  createIntervention,
  getAllInterventions,
  getInterventionById,
  updateIntervention,
  deleteIntervention,
};
