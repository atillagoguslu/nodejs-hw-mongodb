# Node.js MongoDB Application

This Node.js project is built using plain JavaScript and demonstrates the use of MongoDB in a modular API design. The project now includes full authentication, session management, and user-specific contact management.

## Project Capabilities

- **Authentication & Authorization:**
  - User registration, login, logout, and session refresh using JWT-like access/refresh tokens and cookies.
  - All contact routes are protected and user-specific.
- **Database Connection:**
  - Establishes a connection to MongoDB via `src/db/initMongoConnection.js`.
- **Filtering and Sorting:**
  - `src/utils/parseFilterParams.js` parses query filter parameters.
  - `src/utils/parseSortParams.js` parses sorting parameters.
- **Pagination:**
  - `src/utils/calculatePaginationData.js` calculates pagination details.
  - `src/utils/parsePaginationParams.js` helps in parsing and applying pagination parameters.
- **Error Handling:**
  - `src/utils/ctrlWrapper.js` provides a wrapper for controller functions to manage errors gracefully.
- **Data Validation:**
  - `src/validators/contactsValidator.js` and `src/validators/authValidator.js` validate input data.
- **Scalable & Modular Architecture:**
  - The project is organized into logical directories, with `src/db/models` for MongoDB schema definitions and model implementations.

## Authentication

The API supports user authentication and session management. All contact-related endpoints require authentication.

### Endpoints

- `POST /auth/register` — Register a new user.
- `POST /auth/login` — Log in and create a session (returns access token, sets refresh token in cookies).
- `POST /auth/refresh` — Refresh session using the refresh token in cookies (returns new access token).
- `POST /auth/logout` — Log out and delete the session (clears cookies).

### Example Requests

**Register:**

```http
POST /auth/register
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Login:**

```http
POST /auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Refresh:**

```http
POST /auth/refresh
// No body, uses cookies
```

**Logout:**

```http
POST /auth/logout
// No body, uses cookies
```

### Authentication Details

- Access tokens are sent in the Authorization header as `Bearer <token>`.
- Refresh tokens are stored in HTTP-only cookies.
- All `/contacts` endpoints require a valid access token.

## Models

### User (auth)

- `name`: string, required
- `email`: string, required, unique
- `password`: string, required (hashed, not returned in responses)
- `createdAt`, `updatedAt`: timestamps

### Session

- `userID`: ObjectId (refers to User), required
- `accessToken`: string, required
- `refreshToken`: string, required
- `accessTokenValidUntil`: Date, required
- `refreshTokenValidUntil`: Date, required

### Contact

- `userId`: string, required (the owner of the contact)
- `name`: string, required
- `phoneNumber`: string, required
- `email`: string, optional
- `isFavourite`: boolean, default false
- `contactType`: string, enum ['work', 'home', 'personal'], default 'personal'
- `createdAt`, `updatedAt`: timestamps

## API Endpoints and Parameters

The API endpoints accept various query parameters for filtering, sorting, and pagination. All `/contacts` endpoints are user-specific and require authentication.

| Parameter | Type   | Default | Description                               |
| --------- | ------ | ------- | ----------------------------------------- |
| name      | string | -       | Filter contacts by name                   |
| status    | string | -       | Filter contacts by status                 |
| sortBy    | string | -       | Field to sort results (e.g., `createdAt`) |
| order     | string | "asc"   | Sorting order: `asc` or `desc`            |
| page      | number | 1       | Page number for pagination                |
| limit     | number | 10      | Number of records per page                |

**Example API Request:**

```
GET /api/contacts?name=John&sortBy=createdAt&order=desc&page=1&limit=10
Authorization: Bearer <accessToken>
```

## Middleware

- `authenticate`: Protects routes by verifying the access token in the Authorization header. Adds `userID` to the request object for user-specific operations.

## Project Structure

```
nodejs-hw-mongodb/
├── src/
│   ├── db/
│   │   ├── initMongoConnection.js
│   │   └── models/
│   │       ├── auth.js         // User model
│   │       ├── sessions.js     // Session model
│   │       └── contact.js      // Contact model
│   ├── routers/
│   │   ├── auth.js             // Auth routes
│   │   └── contacts.js         // Contact routes
│   ├── controllers/
│   │   ├── auth.js             // Auth controllers
│   │   └── contacts.js         // Contact controllers
│   ├── services/
│   │   ├── auth.js             // Auth services
│   │   └── contacts.js         // Contact services
│   ├── middlewares/
│   │   ├── authenticate.js     // Auth middleware
│   │   └── ...
│   ├── utils/
│   │   ├── parseFilterParams.js
│   │   ├── parseSortParams.js
│   │   ├── calculatePaginationData.js
│   │   ├── parsePaginationParams.js
│   │   └── ctrlWrapper.js
│   └── validators/
│       ├── contactsValidator.js
│       └── authValidator.js
├── .env
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v12+ recommended)
- npm or yarn package manager
- A running MongoDB instance (local or cloud-based such as MongoDB Atlas)

### Installation

1. **Clone the Repository:**

   ```sh
   git clone <repository-url>
   cd nodejs-hw-mongodb
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

   or if you use yarn:

   ```sh
   yarn install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory to set up your MongoDB connection and other configuration parameters. For example:
   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   PORT=3000
   ```

### Running the Application

Start the application with:

```sh
npm start
```

For development, you might use:

```sh
npm run dev
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with improvements or fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Special thanks to all contributors and the open-source community for their invaluable support.
