import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../../api/authService';

const MainLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          
          {user && (
            <div className="mb-6 p-3 bg-gray-700 rounded">
              <p className="text-sm font-semibold">{user.nom} {user.prenom}</p>
              <p className="text-xs text-gray-300">{user.email}</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                user.role === 'admin' ? 'bg-red-600' : 'bg-blue-600'
              }`}>
                {user.role}
              </span>
            </div>
          )}
          
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/users"
              className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Utilisateurs
            </Link>
            <Link
              to="/communes"
              className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Communes
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Gestion des Interventions
            </h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;