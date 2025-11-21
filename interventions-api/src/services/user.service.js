/**
 * User service - business logic for users
 */
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

async function createUser(userData) {
  const { nom, prenom, email, motDePasse, role } = userData;
  // check required fields
  if (!nom || !prenom || !email || !motDePasse) {
    const err = new Error('Champs requis manquants');
    err.status = 400;
    throw err;
  }

  // Check if email exists
  const existing = await userModel.findByEmail(email);
  if (existing) {
    const err = new Error('Email déjà utilisé');
    err.status = 400;
    throw err;
  }

  const hashed = await bcrypt.hash(motDePasse, 10);
  const created = await userModel.create({ nom, prenom, email, password: hashed, role });
  return created;
}

async function getAllUsers() {
  return userModel.findAll();
}

async function getUserById(id) {
  return userModel.findById(id);
}

async function updateUser(id, updateData) {
  const data = {};
  if (updateData.nom !== undefined) data.nom = updateData.nom;
  if (updateData.prenom !== undefined) data.prenom = updateData.prenom;
  if (updateData.email !== undefined) data.email = updateData.email;
  if (updateData.role !== undefined) data.role = updateData.role;
  if (updateData.motDePasse !== undefined && updateData.motDePasse !== '') {
    data.password = await bcrypt.hash(updateData.motDePasse, 10);
  }

  return userModel.update(id, data);
}

async function deleteUser(id) {
  return userModel.delete(id);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
