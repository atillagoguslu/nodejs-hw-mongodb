# Express.js Project Structure

## Project Overview

This is a Node.js project using Express.js framework with a well-organized directory structure following MVC (Model-View-Controller) pattern.

## Directory Structure

```
├── src/
│   ├── controllers/     # Request handlers and business logic
│   ├── services/        # Business logic and data processing
│   ├── routers/         # Route definitions and middleware
│   ├── middlewares/     # Custom middleware functions
│   ├── db/             # Database configuration and models
│   ├── utils/          # Utility functions and helpers
│   ├── server.js       # Main server configuration
│   └── index.js        # Application entry point
├── .env                # Environment variables
└── package.json        # Project dependencies and scripts
```

## Flow of the Application

1. **Entry Point** (`src/index.js`)

   - Initializes the application
   - Sets up environment variables
   - Starts the server

2. **Server Setup** (`src/server.js`)

   - Configures Express application
   - Sets up middleware (cors, json parsing, logging)
   - Defines routes
   - Handles 404 errors
   - Starts the server on specified port

3. **Request Flow**
   ```
   Client Request
   ↓
   Middleware (cors, json parsing, logging)
   ↓
   Router (src/routers/)
   ↓
   Controller (src/controllers/)
   ↓
   Service (src/services/)
   ↓
   Database (src/db/)
   ↓
   Response to Client
   ```

## Key Components

### Controllers

- Handle HTTP requests
- Process request parameters
- Call appropriate services
- Send responses back to client

### Services

- Contain business logic
- Handle data processing
- Interact with database models

### Routers

- Define API endpoints
- Map routes to controllers
- Apply route-specific middleware

### Middleware

- Request preprocessing
- Authentication/Authorization
- Error handling
- Logging

### Database

- Database configuration
- Data models
- Database operations

## Environment Variables

Required environment variables:

- `PORT`: Server port number
- Other configuration variables in `.env`

## Error Handling

- Global error handling middleware
- 404 route handler
- Custom error responses

## Logging

- Uses pino-http for request logging
- Structured logging format
