# Jàng-Tëkki - Plateforme de Gestion de Stages

Une plateforme moderne et complète pour la gestion des stages, développée avec Next.js et Node.js.

## 🚀 Fonctionnalités

### Pour les Stagiaires
- 📝 Candidature aux offres de stage
- 📊 Suivi des candidatures en temps réel
- 📋 Soumission de rapports de stage
- 💬 Communication avec les tuteurs
- 📄 Gestion des conventions de stage

### Pour les Tuteurs
- 👥 Gestion des stagiaires assignés
- ⭐ Évaluation des candidatures
- 📈 Suivi des performances
- 📝 Création de rapports d'évaluation

### Pour les RH
- 🏢 Gestion complète des offres de stage
- 👤 Administration des utilisateurs
- 📊 Tableaux de bord et statistiques
- 📄 Gestion des conventions

### Pour la Direction
- 📈 Vue d'ensemble des activités
- 📊 Rapports et analyses
- ✅ Validation des processus

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Shadcn/ui** - Composants UI modernes
- **Lucide React** - Icônes

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification
- **bcrypt** - Hachage des mots de passe

## 📦 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- MongoDB (local ou cloud)
- npm ou yarn

### Installation rapide

1. **Cloner le repository**
\`\`\`bash
git clone <repository-url>
cd jang-tekki
\`\`\`

2. **Installer toutes les dépendances**
\`\`\`bash
npm run setup
\`\`\`

3. **Configurer les variables d'environnement**
\`\`\`bash
# Backend
cp backend/.env.example backend/.env
# Modifier les valeurs dans backend/.env

# Frontend (optionnel)
cp .env.example .env.local
\`\`\`

4. **Démarrer MongoDB**
\`\`\`bash
# Avec Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Ou utiliser MongoDB Atlas (cloud)
\`\`\`

5. **Initialiser la base de données**
\`\`\`bash
npm run seed
\`\`\`

6. **Démarrer l'application**
\`\`\`bash
# Démarrer frontend et backend simultanément
npm run dev:full

# Ou séparément
npm run dev          # Frontend sur http://localhost:3000
cd backend && npm run dev  # Backend sur http://localhost:5001
\`\`\`

## 🔐 Comptes de Test

Après avoir exécuté `npm run seed`, vous pouvez utiliser ces comptes :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| RH | admin@jang-tekki.com | password123 |
| Tuteur | marie.diop@jang-tekki.com | password123 |
| Stagiaire | amadou.ba@student.com | password123 |
| Direction | fatou.sall@jang-tekki.com | password123 |

## 📁 Structure du Projet

\`\`\`
jang-tekki/
├── app/                    # Pages Next.js (App Router)
├── components/             # Composants React réutilisables
├── hooks/                  # Hooks personnalisés
├── lib/                    # Utilitaires et services
├── backend/                # API Node.js
│   ├── models/            # Modèles Mongoose
│   ├── routes/            # Routes Express
│   ├── middleware/        # Middlewares
│   └── scripts/           # Scripts utilitaires
└── public/                # Fichiers statiques
\`\`\`

## 🔧 Configuration

### Variables d'environnement Backend
\`\`\`env
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/jang-tekki
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
\`\`\`

### Variables d'environnement Frontend
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
\`\`\`

## 📚 API Documentation

L'API REST est disponible sur `http://localhost:5001/api`

### Endpoints principaux
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `GET /api/stages` - Liste des stages
- `POST /api/candidatures` - Créer une candidature
- `GET /api/dashboard/stats` - Statistiques

## 🚀 Déploiement

### Frontend (Vercel)
\`\`\`bash
npm run build
# Déployer sur Vercel
\`\`\`

### Backend (Railway/Heroku)
\`\`\`bash
cd backend
# Configurer les variables d'environnement
# Déployer selon la plateforme choisie
\`\`\`

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

## 🎯 Roadmap

- [ ] Notifications en temps réel
- [ ] Chat intégré
- [ ] Export PDF des rapports
- [ ] Application mobile
- [ ] Intégration calendrier
- [ ] Système de notation avancé
\`\`\`

## Instructions de démarrage

Pour utiliser cette application complète :

1. **Installation initiale** :
\`\`\`bash
npm run setup  # Installe les dépendances frontend et backend
\`\`\`

2. **Configuration** :
   - Copier `backend/.env.example` vers `backend/.env`
   - Modifier les variables d'environnement selon votre configuration

3. **Base de données** :
\`\`\`bash
npm run seed  # Initialise la base avec des données de test
\`\`\`

4. **Démarrage** :
\`\`\`bash
npm run dev:full  # Démarre frontend et backend simultanément
\`\`\`

L'application sera accessible sur :
- Frontend : http://localhost:3000
- Backend API : http://localhost:5001/api
