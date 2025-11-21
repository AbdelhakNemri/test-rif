# 🏛️ Système de Gestion des Interventions Citoyennes

Application full-stack moderne pour la gestion des interventions et réclamations des citoyens avec tableau de bord administratif et authentification sécurisée.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [API Endpoints](#-api-endpoints)
- [Contribuer](#-contribuer)

## 🎯 Aperçu

Ce projet est une solution complète pour la gestion des interventions citoyennes permettant :
- **Authentification sécurisée** avec JWT
- **Dashboard administratif** avec statistiques en temps réel
- **Gestion des utilisateurs** (CRUD complet)
- **Suivi des interventions** par commune et thème
- **Interface moderne** et responsive

## ✨ Fonctionnalités

### 🔐 Authentification & Sécurité
- Connexion sécurisée avec JWT
- Hash des mots de passe avec bcrypt
- Routes protégées côté frontend et backend
- Gestion des rôles (Admin / Utilisateur)
- Sessions persistantes avec localStorage

### 📊 Dashboard Administratif
- Statistiques globales des interventions
- Indicateurs par statut (En attente, En traitement, Résolues, Fermées)
- Top 5 des thèmes les plus traités
- Top 5 des communes avec le plus d'interventions
- Mises à jour en temps réel avec React Query

### 👥 Gestion des Utilisateurs
- Liste complète des utilisateurs
- Création et modification via modal
- Suppression avec confirmation
- Validation des formulaires
- Affichage des rôles

### 🗺️ Gestion des Communes
- Liste des communes
- CRUD complet
- Association avec les interventions

### 📝 Gestion des Interventions
- Suivi complet des réclamations citoyennes
- Statuts multiples (En attente, En traitement, Résolu, Fermé)
- Association avec communes, thèmes et utilisateurs
- Notes de satisfaction (1-5)
- Pièces jointes

## 🛠️ Technologies

### Frontend
- **React 19.2.0** - Framework UI
- **React Router DOM 7.9.6** - Routing
- **Tailwind CSS 3.4.1** - Styling
- **@tanstack/react-query 5.90.10** - State management
- **Axios 1.13.2** - HTTP client

### Backend
- **Node.js + Express 5.1.0** - Serveur API REST
- **Sequelize 6.32.1** - ORM
- **MySQL2 3.5.2** - Base de données
- **bcrypt 5.1.0** - Hash des mots de passe
- **jsonwebtoken 9.0.2** - Authentification JWT

## 📦 Prérequis

- **Node.js** >= 16.x
- **npm** >= 8.x
- **MySQL** >= 8.0
- **Git**

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/AbdelhakNemri/test-rif.git
cd test-rif
```

### 2. Installation Frontend

```bash
cd interventions-ui
npm install
```

### 3. Installation Backend

```bash
cd ../interventions-api
npm install
```

### 4. Configuration de la base de données

```sql
-- Se connecter à MySQL
mysql -u root -p

-- Créer la base de données
CREATE DATABASE test_rif_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Vérifier la création
SHOW DATABASES;
```

## ⚙️ Configuration

### Frontend

Créer un fichier `.env` dans le dossier `interventions-ui` :

```env
REACT_APP_API_URL=http://localhost:4000/api
```

### Backend

Créer un fichier `.env` dans le dossier `interventions-api` :

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=test_rif_db
DB_DIALECT=mysql

# JWT Configuration
JWT_SECRET=votre-cle-secrete-tres-longue-et-aleatoire-changez-en-production

# Server Configuration
PORT=4000
NODE_ENV=development
```

⚠️ **Important** : Changez `JWT_SECRET` par une clé sécurisée en production !

### Initialisation de la base de données

Le backend créera automatiquement les tables au premier démarrage grâce à Sequelize.

Pour insérer des données de test, vous pouvez exécuter le script SQL fourni ou utiliser l'interface admin.

## 🎮 Utilisation

### Démarrer le Backend

```bash
cd interventions-api
npm run dev
```

Le serveur API démarre sur **http://localhost:4000**

### Démarrer le Frontend

Dans un nouveau terminal :

```bash
cd interventions-ui
npm start
```

L'application web s'ouvre sur **http://localhost:3002**

### Connexion par défaut

Si vous avez importé les données de test :

- **Email** : `admin@test.com`
- **Password** : `password`

## 📁 Structure du projet

```
test-rif/
├── interventions-ui/           # Frontend React
│   ├── public/
│   └── src/
│       ├── api/                # Services API
│       │   ├── apiClient.js
│       │   ├── authService.js
│       │   ├── userService.js
│       │   └── dashboardService.js
│       ├── components/         # Composants réutilisables
│       │   ├── layout/
│       │   │   └── MainLayout.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── UserForm.jsx
│       ├── pages/              # Pages principales
│       │   ├── Login.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Users.jsx
│       │   └── Communes.jsx
│       ├── App.js
│       └── index.js
│
├── interventions-api/          # Backend Node.js
│   ├── src/
│   │   ├── models/             # Modèles Sequelize
│   │   │   ├── user.model.js
│   │   │   ├── commune.model.js
│   │   │   ├── theme.model.js
│   │   │   ├── intervention.model.js
│   │   │   ├── pieceJointe.model.js
│   │   │   └── index.js
│   │   ├── controllers/        # Contrôleurs
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── commune.controller.js
│   │   │   └── dashboard.controller.js
│   │   ├── services/           # Logique métier
│   │   │   ├── user.service.js
│   │   │   ├── commune.service.js
│   │   │   └── dashboard.service.js
│   │   ├── routes/             # Routes API
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── commune.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   └── index.js
│   │   └── middlewares/        # Middlewares
│   │       ├── verifyToken.js
│   │       └── admin.middleware.js
│   └── app.js
│
├── PROJECT_SUMMARY.md          # Documentation détaillée
└── README.md                   # Ce fichier
```

## 🔌 API Endpoints

### Authentification

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/auth/login` | Connexion utilisateur | Non |

### Utilisateurs

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/users` | Liste des utilisateurs | Oui |
| GET | `/api/users/:id` | Détail utilisateur | Oui |
| POST | `/api/users` | Créer utilisateur | Admin |
| PUT | `/api/users/:id` | Modifier utilisateur | Admin |
| DELETE | `/api/users/:id` | Supprimer utilisateur | Admin |

### Dashboard

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/dashboard` | Statistiques complètes | Oui |

### Communes

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/communes` | Liste des communes | Oui |
| GET | `/api/communes/:id` | Détail commune | Oui |
| POST | `/api/communes` | Créer commune | Admin |
| PUT | `/api/communes/:id` | Modifier commune | Admin |
| DELETE | `/api/communes/:id` | Supprimer commune | Admin |

### Format de réponse API

**Succès :**
```json
{
  "id": 1,
  "nom": "Dupont",
  "email": "dupont@test.com",
  "role": "Admin"
}
```

**Erreur :**
```json
{
  "message": "Email ou mot de passe incorrect"
}
```

## 🧪 Tests

```bash
# Frontend (à implémenter)
cd interventions-ui
npm test

# Backend (à implémenter)
cd interventions-api
npm test
```

## 📝 Scripts disponibles

### Frontend

```bash
npm start       # Démarre le serveur de développement
npm build       # Build de production
npm test        # Lance les tests
npm eject       # Éjecte la configuration CRA
```

### Backend

```bash
npm start       # Démarre le serveur
npm run dev     # Démarre avec nodemon (hot reload)
npm test        # Lance les tests
```

## 🔒 Sécurité

- ✅ Mots de passe hashés avec bcrypt (10 rounds)
- ✅ JWT avec expiration (24h)
- ✅ Routes protégées par middleware
- ✅ Validation des entrées utilisateur
- ✅ Protection contre les injections SQL (Sequelize)
- ⚠️ À améliorer : CORS, rate limiting, helmet.js

## 🐛 Dépannage

### Le backend ne démarre pas

```bash
# Vérifier la connexion MySQL
mysql -u root -p

# Vérifier les variables d'environnement
cat .env

# Vérifier les logs
npm run dev
```

### Le frontend ne se connecte pas

```bash
# Vérifier que le backend est démarré
curl http://localhost:4000/api/hello

# Vérifier le fichier .env
cat .env

# Nettoyer le cache
rm -rf node_modules package-lock.json
npm install
```

### Erreur de connexion à la base de données

```sql
-- Vérifier l'utilisateur MySQL
SELECT user, host FROM mysql.user;

-- Donner les privilèges
GRANT ALL PRIVILEGES ON test_rif_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

## 🚧 Roadmap

- [ ] Module de gestion des interventions (interface complète)
- [ ] Upload de pièces jointes
- [ ] Système de notifications
- [ ] Pagination sur les listes
- [ ] Tests unitaires et d'intégration

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

**Abdelhak Nemri**

- GitHub: [@AbdelhakNemri](https://github.com/AbdelhakNemri)
- Repository: [test-rif](https://github.com/AbdelhakNemri/test-rif)


t

---
