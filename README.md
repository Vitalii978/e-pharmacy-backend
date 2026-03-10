# E-Pharmacy Backend API

Backend for E-Pharmacy admin panel. Built with Node.js, Express, MongoDB, and
JWT authentication.

## 🚀 Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

## 📋 API Endpoints

### Authentication

- `POST /api/user/login` - Login user
- `GET /api/user/user-info` - Get user info (protected)
- `GET /api/user/logout` - Logout user (protected)

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   Create .env file from .env.example:
   ```

bash cp .env.example .env Fill in your environment variables in .env

Start the server:

bash npm run dev 🔧 Environment Variables Create a .env file with:

env PORT=3000 DB_HOST=mongodb://localhost:27017/e-pharmacy
JWT_SECRET=your_jwt_secret_key JWT_EXPIRES_IN=7d 📦 Scripts npm start - Run
production server

npm run dev - Run development server with nodemon

🔒 Authentication The API uses JWT tokens for authentication. To access
protected routes, include the token in the Authorization header:

text Authorization: Bearer <your_token> 🗄️ Database MongoDB is used as the
database. Make sure MongoDB is running locally or provide a remote connection
string in DB_HOST.

text

## Добавляем README.md в коммит

```bash
git add README.md
git commit -m "docs: add README.md"
git push
```
