const { User } = require('./sequelize');

async function create(user) {
  const { nom, prenom, email, password, role } = user;
  const created = await User.create({ nom, prenom, email, password, role: role || 'Utilisateur' });
  // Ensure password is not returned
  const plain = created.get({ plain: true });
  delete plain.password;
  return plain;
}

async function findAll() {
  const rows = await User.findAll({ attributes: ['id', 'nom', 'prenom', 'email', 'role'] });
  return rows.map(r => r.get({ plain: true }));
}

async function findById(id) {
  const row = await User.findByPk(Number(id), { attributes: ['id', 'nom', 'prenom', 'email', 'role'] });
  return row ? row.get({ plain: true }) : null;
}

async function findByEmail(email) {
  // include password for authentication internal use
  const row = await User.scope('withPassword').findOne({ where: { email } });
  return row ? row.get({ plain: true }) : null;
}

async function update(id, user) {
  const instance = await User.findByPk(Number(id));
  if (!instance) return null;
  // update fields directly on instance; caller should provide hashed password if needed
  const updatable = ['nom', 'prenom', 'email', 'password', 'role'];
  updatable.forEach(f => {
    if (user[f] !== undefined) instance.set(f, user[f]);
  });
  await instance.save();
  const plain = instance.get({ plain: true });
  delete plain.password;
  return plain;
}

async function remove(id) {
  const destroyed = await User.destroy({ where: { id: Number(id) } });
  return destroyed > 0;
}

module.exports = {
  create,
  findAll,
  findById,
  findByEmail,
  update,
  delete: remove,
};
