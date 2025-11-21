import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import userService from '../api/userService';

const UserForm = ({ user, onClose, onSuccess }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  // Pré-remplir le formulaire si on modifie un utilisateur existant
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '', // Ne pas pré-remplir le mot de passe
        role: user.role || 'user',
      });
    }
  }, [user]);

  // Mutation pour créer un utilisateur
  const createMutation = useMutation({
    mutationFn: (data) => userService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      onSuccess?.('Utilisateur créé avec succès');
      onClose();
    },
    onError: (error) => {
      alert(error?.response?.data?.message || 'Erreur lors de la création');
    },
  });

  // Mutation pour mettre à jour un utilisateur
  const updateMutation = useMutation({
    mutationFn: (data) => userService.updateUser(user.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      onSuccess?.('Utilisateur mis à jour avec succès');
      onClose();
    },
    onError: (error) => {
      alert(error?.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.username || !formData.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!user && !formData.password) {
      alert('Le mot de passe est requis pour créer un utilisateur');
      return;
    }

    // Préparer les données (ne pas envoyer le mot de passe vide en mise à jour)
    const dataToSend = { ...formData };
    if (user && !formData.password) {
      delete dataToSend.password;
    }

    // Appeler la mutation appropriée
    if (user) {
      updateMutation.mutate(dataToSend);
    } else {
      createMutation.mutate(dataToSend);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {user ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom d'utilisateur */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nom d'utilisateur <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le nom d'utilisateur"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez l'email"
              required
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mot de passe {!user && <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={user ? 'Laisser vide pour ne pas changer' : 'Entrez le mot de passe'}
              required={!user}
            />
          </div>

          {/* Rôle */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Rôle</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
            >
              {isLoading && (
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {user ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;