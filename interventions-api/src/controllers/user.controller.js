/**
 * User controller - handles HTTP requests/responses
 */
const userService = require('../services/user.service');

async function createUser(req, res) {
  try {
    const payload = req.body;
    const created = await userService.createUser(payload);
    return res.status(201).json(created);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Erreur serveur' });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updated = await userService.updateUser(id, updateData);
    if (!updated) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    return res.status(200).json(updated);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Erreur serveur' });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const deleted = await userService.deleteUser(id);
    if (!deleted) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
