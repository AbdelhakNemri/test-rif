const communeService = require('../services/commune.service');

async function createCommune(req, res) {
  try {
    const payload = req.body;
    const created = await communeService.createCommune(payload);
    return res.status(201).json(created);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Erreur serveur' });
  }
}

async function getAllCommunes(req, res) {
  try {
    const rows = await communeService.getAllCommunes();
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

async function getCommuneById(req, res) {
  try {
    const id = req.params.id;
    const commune = await communeService.getCommuneById(id);
    if (!commune) return res.status(404).json({ message: 'Commune non trouvée' });
    return res.status(200).json(commune);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

async function updateCommune(req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updated = await communeService.updateCommune(id, updateData);
    if (!updated) return res.status(404).json({ message: 'Commune non trouvée' });
    return res.status(200).json(updated);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Erreur serveur' });
  }
}

async function deleteCommune(req, res) {
  try {
    const id = req.params.id;
    const deleted = await communeService.deleteCommune(id);
    if (!deleted) return res.status(404).json({ message: 'Commune non trouvée' });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

module.exports = {
  createCommune,
  getAllCommunes,
  getCommuneById,
  updateCommune,
  deleteCommune,
};
