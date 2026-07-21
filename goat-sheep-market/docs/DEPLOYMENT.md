# Deployment Guide

Follow these step-by-step instructions to deploy the application.

## 🗄️ 1. Database (MongoDB Atlas)
1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Deploy a free tier cluster M0.
3. Whitelist access IP addresses (`0.0.0.0/0` for global hosting environments).
4. Create a database user and capture your connection string:
   `mongodb+srv://<username>:<password>@cluster.mongodb.net/market?retryWrites=true&w=majority`

## 🖥️ 2. Backend (Render / Heroku)
The backend is prepared for direct cloud node deployment.
1. Create a free account on [Render](https://render.com/).
2. Select **New Web Service** and connect your GitHub repository.
3. Configure settings:
   * **Runtime**: `Node`
   * **Build Command**: `cd backend && npm install`
   * **Start Command**: `cd backend && npm start`
4. Add Environment Variables inside Render Console:
   * `PORT`: `5000`
   * `MONGO_URI`: `your_mongodb_atlas_connection_string`
   * `JWT_SECRET`: `generate_a_long_random_hash`
   * `NODE_ENV`: `production`

## 🎨 3. Frontend (Vercel / Netlify / Github Pages)
Since the frontend operates purely on HTML5/CSS/JS, it can be deployed for free as a static site.
1. Sign up on [Vercel](https://vercel.com/).
2. Click **Add New Project**, link the repository.
3. Set **Root Directory** of target deployment to `frontend`.
4. Deploy.

### Connect Frontend with Deployed Production API
1. In `frontend/app.js`, update the API config URL:
   ```javascript
   const API_BASE_URL = "https://your-backend-app.onrender.com/api";
   ```
