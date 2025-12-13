
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
# Exercise Program API
---

## 🔐 Authentication Overview

This API uses **JSON Web Tokens (JWT)** for authentication.

### Authorization Header Format

All protected routes require the following header:

```
Authorization: Bearer <JWT_TOKEN>
```

Tokens are obtained via the **Login** endpoint.

---

## 👤 User Roles & Permissions

| Role               | Permissions                    |
| ------------------ | ------------------------------ |
| Authenticated User | Full CRUD access to Exercises  |
| Unauthenticated    | Cannot access protected routes |

---

# 🔑 AUTH ENDPOINTS

## Register User

**POST** `/api/auth/register`

Creates a new user account.

### Request Headers

```
Content-Type: application/json
```

### Request Body

```json
{
  "username": "testuser",
  "password": "password123"
}
```

### Success Response (201 Created)

```json
{
  "message": "User registered"
}
```

### Error Responses

* `400 Bad Request` — Missing fields
* `500 Internal Server Error` — User already exists or server error

---

## Login User

**POST** `/api/auth/login`

Authenticates a user and returns a JWT token.

### Request Headers

```
Content-Type: application/json
```

### Request Body

```json
{
  "username": "testuser",
  "password": "password123"
}
```

### Success Response (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Responses

* `401 Unauthorized` — Invalid credentials
* `500 Internal Server Error`

---

# 🏋️ EXERCISE ENDPOINTS (CRUD)

All Exercise endpoints **require authentication**.

---

## Create Exercise

**POST** `/api/exercises`

### Permissions

* ✅ Authenticated users only

### Headers

```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "name": "Bench Press",
  "muscleGroup": "Chest"
}
```

### Success Response (201 Created)

```json
{
  "id": 1,
  "name": "Bench Press",
  "muscleGroup": "Chest"
}
```

### Error Responses

* `400 Bad Request` — Missing required fields
* `401 Unauthorized` — Missing or invalid token
* `500 Internal Server Error`

---

## Get All Exercises

**GET** `/api/exercises`

### Permissions

* ✅ Authenticated users only

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

### Success Response (200 OK)

```json
[
  {
    "id": 1,
    "name": "Bench Press",
    "muscleGroup": "Chest"
  }
]
```

### Error Responses

* `401 Unauthorized` — Missing token
* `500 Internal Server Error`

---

## Get Exercise by ID

**GET** `/api/exercises/:id`

### Permissions

* ✅ Authenticated users only

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

### Success Response (200 OK)

```json
{
  "id": 1,
  "name": "Bench Press",
  "muscleGroup": "Chest"
}
```

### Error Responses

* `404 Not Found` — Exercise does not exist
* `401 Unauthorized`

---

## Update Exercise

**PUT** `/api/exercises/:id`

### Permissions

* ✅ Authenticated users only

### Headers

```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "name": "Incline Bench Press"
}
```

### Success Response (200 OK)

```json
{
  "id": 1,
  "name": "Incline Bench Press",
  "muscleGroup": "Chest"
}
```

### Error Responses

* `400 Bad Request` — Invalid data
* `404 Not Found`
* `401 Unauthorized`

---

## Delete Exercise

**DELETE** `/api/exercises/:id`

### Permissions

* ✅ Authenticated users only

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

### Success Response (200 OK)

```json
{
  "message": "Exercise deleted successfully"
}
```

### Error Responses

* `404 Not Found`
* `401 Unauthorized`
* `500 Internal Server Error`

---

# 🚫 ERROR HANDLING EXAMPLES

## Missing Token

```json
{
  "error": "No token provided"
}
```

Status: `401 Unauthorized`

---

## Invalid Exercise ID

```json
{
  "error": "Exercise not found"
}
```

Status: `404 Not Found`

---



---


