
# Exercise Program API

An API made to track exercises, there sets, and reps.  
This repo contains: controllers, routes, middleware, and tests for a simple exercise-tracking backend built with Node.js, Express, and Sequelize (SQLite). The API is also documented by Postman as well.

---

## Project overview

**Purpose:** The goal is to provide an easy way to track your exercises in a clean, orderly fashion. 
**Main features:**
- User management (basic)
- Exercise CRUD (create/read/update/delete)
- Set and Rep CRUD
- Basic middleware: JSON parsing, logging, error handling
- Jest + Supertest tests using an in-memory SQLite database
- Postman collection for manual testing

---

## Getting started (local)

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Clone & install
```bash
git clone <your_repo_url>
cd exercise-program-api
npm install
```

### Environment
Create a `.env` file in the project root (example):
```
PORT=4000
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### Database setup

Create or reset the database:
```bash
npm run db:setup
```

Seed the database 
```bash
npm run db:seed
```

### Run the server
Development (nodemon):
```bash
npm run dev
```

Production:
```bash
npm start
```

Server will run at `http://localhost:4000` by default.

---

## Scripts (package.json)
- `start` - start server
- `dev` - start server with nodemon
- `db:setup` - create/reset database tables
- `db:seed` - seed sample data
- `test` - run Jest tests (uses in-memory SQLite when NODE_ENV=test)

---

## API Documentation

Base URL: `http://localhost:4000` (replace with `{{base_url}}` in Postman)

All responses are JSON. Error responses have the form:
```json
{ "error": "message" }
```

### Authentication (optional)
If you implement auth endpoints, use:
- `POST /api/auth/register` — register user (returns user id)
- `POST /api/auth/login` — login (returns JWT)

Add `Authorization: Bearer <token>` header to protected requests.

---

### Users

*GET /api/users**  


*GET /api/users/:id**  


*POST /api/users**  


*PUT /api/users/:id**  


*DELETE /api/users/:id**  
 


### Exercises

**GET /api/exercises**  
List your exercises

**GET /api/exercises/:id**  


**POST /api/exercises**  
Create new exercise. 

**PUT /api/exercises/:id**  
Update certain exercise

**DELETE /api/exercises/:id**  

Delete exercise


---

### Sets

*GET /api/sets**  


*GET /api/sets/:id**  


*POST /api/sets**  

*PUT /api/sets/:id**  


*DELETE /api/sets/:id**  

---

### Reps

*GET /api/reps**  


*GET /api/reps/:id**  


*POST /api/reps**  


*PUT /api/reps/:id**  


*DELETE /api/reps/:id**  


### Log

*POST /api/log**  


## Running Tests

npm test


## Postman


---


