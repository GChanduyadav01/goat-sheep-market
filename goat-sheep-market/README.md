# Goat & Sheep Market 🐐🐏

Goat & Sheep Market is a modern, responsive, and dual-language (English & Telugu) livestock marketplace web application. It connects livestock farmers (sellers) with potential buyers. 

The application features a Node.js/Express backend with MongoDB, and an interactive modern HTML5/CSS3/JavaScript frontend with robust dual-mode integration.

---

## 🏗️ Project Structure

```
goat-sheep-market/
├── frontend/
│   ├── index.html        # Interactive Single Page Application (SPA)
│   ├── styles.css        # Clean, modern UI styling (including Dark Mode)
│   └── app.js            # Core application state, translation, maps, and API integration
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers (Auth, Listings)
│   ├── middleware/       # JWT auth verification, file upload rules
│   ├── models/           # Mongoose Data Schemas (User, Listing)
│   ├── routes/           # API Endpoints layout
│   ├── server.js         # Entry point for backend Express engine
│   └── package.json      # Backend requirements
├── database/
│   ├── seed.js           # Database population utility
│   └── README.md         # Database schema validation details
├── docs/
│   ├── API.md            # Fully-documented API routes
│   └── DEPLOYMENT.md     # Production deployment instructions
├── .gitignore
└── LICENSE
```

---

## ⚡ Quick Start

### 1. Dual-Mode Frontend (Instant Launch)
The frontend contains an automated fallback mechanism. If the backend API is not run, it switches seamlessly into **Demo Mode** using HTML5 localStorage. This lets you inspect the complete user experience, maps, translations, search filters, details modals, and dashboards immediately without launching MongoDB.
* Open `frontend/index.html` directly in your web browser.

### 2. Full-Stack Setup (Node.js & MongoDB)
To run the fully dynamic system:

#### A. Backend setup
1. Navigate to backend:
   ```bash
   cd backend
   ```
2. Copy configuration profile and configure your environment:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

#### B. Database Seeding (Optional)
To populate mock listings in MongoDB:
```bash
cd database
node seed.js
```
