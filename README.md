# Node.js MongoDB Application

This Node.js project is built using plain JavaScript and demonstrates the use of MongoDB in a modular API design. The project leverages various utilities to handle filtering, sorting, pagination, error management, and data validation.

## Project Capabilities

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

  - `src/validators/contactsValidator.js` validates contact information according to a defined schema.

- **Scalable & Modular Architecture:**
  - The project is organized into logical directories, with `src/db/models` intended for MongoDB schema definitions and model implementations, making it easy to extend with new features.

## API Endpoints and Parameters

The API endpoints of this project accept various query parameters to tailor data output and manage resources effectively:

- **Filtering:**

  - Use filter parameters to query specific fields such as `name`, `status`, etc.
  - For example, `?name=John` filters records matching the name "John".
  - Filtering is implemented in `src/utils/parseFilterParams.js`.

- **Sorting:**

  - Use `sortBy` to specify a field for sorting (e.g., `createdAt`).
  - Use `order` with values `asc` or `desc` to set the sorting order.
  - For example, `?sortBy=createdAt&order=desc` sorts records by creation date in descending order.
  - Sorting is handled by `src/utils/parseSortParams.js`.

- **Pagination:**

  - Use `page` for the page number and `limit` for the number of results per page.
  - For example, `?page=2&limit=10` retrieves the second set of 10 records.
  - Pagination is processed using `src/utils/parsePaginationParams.js` and `src/utils/calculatePaginationData.js`.

- **Validation:**
  - Endpoints that accept POST or PUT requests use validators from `src/validators/contactsValidator.js` to ensure input data is valid.

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

## Project Structure

```
nodejs-hw-mongodb/
├── src/
│   ├── db/
│   │   ├── initMongoConnection.js
│   │   └── models/       // MongoDB models and schemas
│   ├── utils/
│   │   ├── parseFilterParams.js
│   │   ├── parseSortParams.js
│   │   ├── calculatePaginationData.js
│   │   ├── parsePaginationParams.js
│   │   └── ctrlWrapper.js
│   └── validators/
│       └── contactsValidator.js
├── .env
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with improvements or fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Special thanks to all contributors and the open-source community for their invaluable support.
