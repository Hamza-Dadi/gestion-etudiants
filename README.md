# Gestion des Étudiants — MERN Stack (ESISA S101)

Application complète de gestion des étudiants développée dans le cadre du **TP N°1 — Module CMS (S101)** sous la direction du **Professeur Othman Mekouar**.

**Étudiant :** Hamza Dadi  
**Établissement :** ESISA — 3ème Année  
**Année académique :** 2026/2027  

---

## 🛠️ Stack Technologique (MERN)

- **M**ongoDB : Base de données NoSQL orientée documents hébergée sur MongoDB Atlas
- **E**xpress.js : Framework backend Node.js pour concevoir l'API REST
- **R**eact.js : Bibliothèque frontend pour l'interface utilisateur (avec Vite)
- **N**ode.js : Environnement d'exécution JavaScript côté serveur
- **Outils complémentaires :** Mongoose 9 (ODM), CORS, dotenv, Nodemon

---

## 📁 Architecture du Projet

```text
gestion-etudiants/
├── backend/
│   ├── controllers/
│   │   └── etudiantController.js # Logique CRUD des étudiants
│   ├── routes/
│   │   └── etudiantRoutes.js     # Définition des routes /api/etudiants
│   ├── models/
│   │   └── Etudiant.js           # Modèle Mongoose pour les étudiants
│   ├── .env                      # Variables d'environnement locales (gitignored)
│   ├── .env.example              # Modèle sans secrets pour GitHub
│   ├── package.json              # Dépendances et scripts backend
│   └── server.js                 # Point d'entrée du serveur Express
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Interface React (formulaire + liste des étudiants)
│   │   ├── main.jsx              # Point d'entrée React
│   │   └── index.css             # Styles épurés et modernes
│   ├── index.html                # Fichier HTML principal
│   ├── package.json              # Dépendances Vite et React
│   └── vite.config.js            # Configuration Vite
├── .gitignore                    # Exclusion de node_modules, .env, dist
└── README.md                     # Documentation complète et réponses aux questions
```

---

## 🚀 Démarrage Rapide

### 1. Prérequis
- Node.js (version 18 ou supérieure)
- Un compte MongoDB Atlas (ou une instance MongoDB locale)

### 2. Configuration et démarrage du Backend

```bash
cd backend
npm install

# Créer le fichier .env à partir du modèle :
cp .env.example .env
# Renseigner la variable MONGO_URI avec votre chaîne de connexion Atlas réelle

# Lancer en mode développement (avec nodemon) :
npm run dev

# Ou lancer en mode production :
npm start
```
Le serveur écoute par défaut sur `http://localhost:5000`.

### 3. Démarrage du Frontend React

```bash
cd frontend
npm install
npm run dev
```
L'interface est accessible sur `http://localhost:5173`.

---

## 📡 Documentation des Endpoints de l'API

### 🔹 Routes de Test
| Méthode | Route | Description | Réponse |
|---------|-------|-------------|---------|
| `GET` | `/` | Message de bienvenue | `"Mon premier serveur MERN !"` |
| `GET` | `/api/test` | Vérification de l'API | `{"message": "L'API fonctionne correctement"}` |

### 🔹 Gestion des Étudiants (CRUD)
| Méthode | Route | Description | Corps de requête (JSON) | Code HTTP |
|---------|-------|-------------|--------------------------|-----------|
| `GET` | `/api/etudiants` | Récupérer tous les étudiants | Aucun | `200 OK` |
| `POST` | `/api/etudiants` | Créer un nouvel étudiant | `{"nom": "Sara", "email": "sara@example.com", "age": 21}` | `201 Created` |
| `PUT` | `/api/etudiants/:id` | Modifier un étudiant | `{"nom": "Sara Benali", "email": "sara@example.com", "age": 22}` | `200 OK` |
| `DELETE` | `/api/etudiants/:id` | Supprimer un étudiant | Aucun | `200 OK` |

---

## 📝 Réponses aux Questions de Compréhension (Section 16)

### 1. Quelle est la différence entre Node.js et Express ?
- **Node.js** est un environnement d'exécution (runtime) JavaScript multiplateforme côté serveur, basé sur le moteur V8 de Google Chrome. Il permet d'exécuter du JavaScript en dehors du navigateur et d'interagir avec le système (fichiers, sockets, réseau).
- **Express** est un framework minimaliste bâti au-dessus de Node.js. Il fournit une abstraction simplifiée pour gérer les requêtes HTTP, le routage d'URL, les middlewares et les réponses JSON/HTML. Pour résumer : Node.js est le moteur d'exécution, Express est le framework web.

### 2. Quel est le rôle de MongoDB dans une application MERN ?
MongoDB constitue la couche de persistance de données (le **M** de MERN). C'est une base de données NoSQL orientée documents qui stocke les informations sous forme de documents BSON (similaires au JSON). Dans ce TP, MongoDB stocke de façon pérenne la collection des `etudiants`.

### 3. Quelle différence existe-t-il entre GET et POST ?
- **GET** est une méthode HTTP idempotente et sûre conçue pour récupérer des informations depuis le serveur sans en modifier l'état. Les éventuels paramètres sont transmis dans l'URL (query strings).
- **POST** est une méthode conçue pour soumettre des données au serveur en vue de créer une nouvelle ressource. Les données sont transportées dans le corps de la requête (`body`), ce qui permet d'envoyer des données structurées en JSON.

### 4. À quoi servent `req.body` et `req.params` ?
- `req.body` : contient les données transmises dans le corps de la requête HTTP (nécessite le middleware `express.json()`). Utilisé typiquement lors des requêtes POST et PUT pour recevoir les objets à créer ou modifier.
- `req.params` : contient les paramètres variables définis dans l'URL de la route (ex: dans `/api/etudiants/:id`, `req.params.id` récupère l'identifiant spécifique ciblé).

### 5. Pourquoi utilise-t-on Mongoose ?
Mongoose est une bibliothèque ODM (*Object Data Modeling*) pour Node.js et MongoDB. Il apporte :
1. La définition d'un **schéma strict** avec typage, validations (`required`, `min`, `unique`).
2. Des **modèles métiers** faciles à manipuler avec des méthodes CRUD intuitives (`find()`, `save()`, `findByIdAndUpdate()`, `findByIdAndDelete()`).
3. Le **casting automatique** des identifiants (`ObjectId`) et types de données.
4. Une couche d'abstraction évitant les requêtes manuelles bas niveau.

### 6. Pourquoi tester une API avec Postman avant de développer React ?
Tester avec Postman permet d'isoler la couche backend de la couche frontend. Si un problème survient, on est certain qu'il s'agit soit du backend (détecté immédiatement dans Postman), soit du frontend (détecté dans le navigateur). Cela évite de perdre du temps à chercher une erreur dans React alors que le bug provient d'une route Express mal configurée ou d'une erreur de base de données.

### 7. Pourquoi le fichier `.env` doit-il être ignoré par Git ?
Le fichier `.env` contient des secrets confidentiels : identifiants et mot de passe de la base MongoDB Atlas, clés secrètes, tokens d'API. Si ce fichier est publié sur GitHub, n'importe qui peut accéder à la base de données, la détruire, ou voler des données personnelles. À la place, on versionne un fichier modèle `.env.example` dépourvu de secrets.

### 8. Quel est le rôle de `useEffect` et `useState` dans le composant React fourni ?
- `useState` : hook permettant de déclarer des variables d'état locales réactives (`etudiants`, `erreur`, `nom`, etc.). Lorsque la fonction de mise à jour associée (ex: `setEtudiants`) est appelée, React déclenche automatiquement un re-rendu du composant avec les nouvelles données.
- `useEffect` : hook permettant d'exécuter des effets de bord (comme appeler une API distante). En lui passant un tableau de dépendances vide `[]`, la fonction s'exécute une seule fois au montage du composant dans le DOM, évitant ainsi d'exécuter des appels HTTP en boucle infinie.

---

## 🔒 Checklist de Vérification

- [x] Le serveur démarre sans erreur sur le port 5000 (`npm run dev` / `npm start`).
- [x] La connexion MongoDB Atlas est opérationnelle avec Mongoose.
- [x] Les quatre routes CRUD (`GET`, `POST`, `PUT`, `DELETE` sur `/api/etudiants`) fonctionnent et sont testées.
- [x] Architecture modulaire organisée en `controllers/`, `routes/` et `models/`.
- [x] Le frontend React (Vite) affiche la liste des étudiants et permet l'ajout/suppression en temps réel.
- [x] Le dépôt Git contient un historique de commits clair et explicite.
- [x] Le fichier `.env` et les dossiers `node_modules` sont strictement exclus par `.gitignore`.
