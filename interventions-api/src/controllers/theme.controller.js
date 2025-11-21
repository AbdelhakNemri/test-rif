/**
 * Theme controller - handles HTTP requests/responses
 */
const themeService = require('../services/theme.service');

async function createTheme(req, res) {
  try {
    const payload = req.body;
    const created = await themeService.createTheme(payload);
    return res.status(201).json(created);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Erreur serveur' });
  }
}

async function getAllThemes(req, res) {
  try {
    const themes = await themeService.getAllThemes();
    return res.status(200).json(themes);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

async function getThemeById(req, res) {
  try {
    const id = req.params.id;
    const theme = await themeService.getThemeById(id);
    if (!theme) return res.status(404).json({ message: 'Thème non trouvé' });
    return res.status(200).json(theme);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

async function updateTheme(req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updated = await themeService.updateTheme(id, updateData);
    if (!updated) return res.status(404).json({ message: 'Thème non trouvé' });
    return res.status(200).json(updated);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Erreur serveur' });
  }
}

async function deleteTheme(req, res) {
  try {
    const id = req.params.id;
    const deleted = await themeService.deleteTheme(id);
    if (!deleted) return res.status(404).json({ message: 'Thème non trouvé' });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

module.exports = {
  createTheme,
  getAllThemes,
  getThemeById,
  updateTheme,
  deleteTheme,
};
