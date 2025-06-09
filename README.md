# COMPAQi Test Backend - Locations API

A TypeScript-based REST API for managing user locations with JWT authentication and MongoDB storage.

## Architecture Overview

This application follows a layered MVC (Model-View-Controller) architecture pattern with clear separation of concerns:

```
┌─────────────────────┐
│     Client Side     │ ← Static HTML/CSS served from /public
├─────────────────────┤
│   Express Router    │ ← Route definitions and middleware
├─────────────────────┤
│    Controllers      │ ← Business logic and request handling
├─────────────────────┤
│      Models         │ ← Data models and database schemas
├─────────────────────┤
│     Database        │ ← MongoDB with Mongoose ODM
└─────────────────────┘
```

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Development**: ts-node-dev for hot reloading

## Project Structure

```
src/
├── index.ts                    # Application entry point
├── config/
│   └── database.config.ts      # MongoDB connection configuration
├── controllers/
│   ├── index.ts               # Controller exports
│   └── locations.controller.ts # Location business logic
├── middlewares/
│   ├── index.ts               # Middleware exports
│   ├── handleAuthorization.ts # JWT authentication middleware
│   └── validateFields.ts      # Request validation middleware
├── models/
│   ├── index.ts               # Model exports
│   └── Location.model.ts      # Location schema and model
├── routes/
│   ├── index.ts               # Route exports
│   └── locations.router.ts    # Location route definitions
└── types/
    ├── decodedToken.type.ts   # JWT token type definitions
    ├── locationDocument.type.ts # Location document interface
    ├── request.type.ts        # Typed request interface
    ├── response.type.ts       # Typed response interface
    └── userToken.ts           # User token interface
```

## Core Components

### 1. Entry Point (`src/index.ts`)

- Initializes Express application
- Sets up CORS and JSON parsing
- Configures static file serving from `/public`
- Establishes database connection
- Mounts location routes under `/api/locations`

### 2. Database Layer (`src/config/database.config.ts`)

- Handles MongoDB connection using Mongoose
- Implements connection error handling
- Uses environment variables for database URL

### 3. Models (`src/models/Location.model.ts`)

- Defines Location schema with required fields:
  - `tag`: String identifier for the location
  - `latitude`/`longitude`: Geographic coordinates
  - `placeId`: External place identifier
  - `sub`: User subject from JWT
  - `user_email`: User's email address
- Implements custom `toJSON` method for response formatting

### 4. Controllers (`src/controllers/locations.controller.ts`)

- **`fetchLocations`**: Retrieves all locations
- **`saveLocation`**: Creates new location with user association
- **`deleteLocation`**: Removes location by ID
- Implements proper error handling and HTTP status codes

### 5. Middleware

- **Authentication** (`handleAuthorization.ts`):
  - Validates JWT tokens from Authorization header
  - Extracts user information and attaches to request
  - Returns 401 for invalid/missing tokens
- **Validation** (`validateFields.ts`):
  - Uses express-validator for request validation
  - Returns structured error messages for invalid fields

### 6. Routes (`src/routes/locations.router.ts`)

- **GET** `/api/locations` - Fetch all locations
- **POST** `/api/locations` - Create new location (with validation)
- **DELETE** `/api/locations/:id` - Delete location by ID
- All routes protected by JWT authentication middleware

### 7. Type System

Strong TypeScript typing throughout:

- `LocationDocumentT`: Location document structure
- `TypedRequest`/`TypedResponse`: Generic typed Express interfaces
- `DecodedTokenT`: JWT payload structure
- `UserTokenT`: User information from token

## Authentication Flow

1. Client sends request with `Authorization: Bearer <token>` header
2. `handleAuthorization` middleware intercepts request
3. Token is extracted and decoded (not verified - assuming external verification)
4. User information (`sub`, `email`) extracted from token payload
5. User data attached to request object for controller access
6. Request proceeds to controller if authentication succeeds

## Data Flow

### Fetching Locations:

1. GET request to `/api/locations`
2. Authentication middleware validates token
3. Controller queries all locations from database
4. Locations array returned in response

### Creating a Location:

1. POST request to `/api/locations` with location data
2. Authentication middleware validates JWT token
3. Field validation middleware checks required fields
4. Controller extracts user info from token and location data from body
5. New Location document created with user association
6. Document saved to MongoDB
7. Created location returned in response

### Deleting a Location:

1. DELETE request to `/api/locations/:id` with location ID in URL params
2. Authentication middleware validates JWT token
3. Controller extracts location ID from request parameters
4. Location document searched and deleted from MongoDB using `findByIdAndDelete`
5. If location not found, 404 error returned
6. If deletion successful, confirmation response returned

## Environment Variables

Required environment variables:

- `DB_CONNECTION`: MongoDB connection string
- `PORT`: Server port (defaults to 3000)

## Security Features

- JWT-based authentication on all endpoints
- Input validation using express-validator
- CORS enabled for cross-origin requests
- Structured error handling without exposing internal details

## Development Scripts

- `npm run start-dev`: Development server with hot reloading
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run compiled production build

## Static Frontend

The application serves a simple HTML interface from the `/public` directory, providing a basic web interface for the API.

This architecture provides a solid foundation for a scalable location management API with proper separation of concerns, type safety, and security measures.
