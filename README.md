# exim | Educational and Care System Interaction Map of Chemnitz 

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
  
## Overview

In today's world, we like to get important information optimally “for free” (licensed accordingly), just right now
and in a non-proprietary form - as Open Data.

Sources could be web portals that offer Open Data. Every administrative level such as cities and states in
Germany should have one - including Chemnitz. 

Children, adolescents, and young adults require access to the education and care system. This
is essential for their development and also legally mandated. Identifying such facilities, where
they are located, and how they can be reached is therefore a crucial decision criterion.

## Features

- User authentication and authorization
- Add and manage home address
- View facilities on an interactive map
- Mark favorite facilities
- View detailed information about each facility
- Show routes from home to selected facilities

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation Steps

1. Clone the repository: `git clone https://github.com/Nikvasil/exim.git`
2. Navigate to the project directory: `cd exim`
3. Install the dependencies: `npm run install-all`
4. Create `.env` files in both `server/` and `client/` directories and add your environment variables:

`/server/.env`:
```\server\.env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

`/client/.env`:
```\client\.env
VITE_GRAPH_HOPPER_API_KEY=your_graph_hopper_api_key
```
5. To run a server and make API calls locally you should change `baseURL` property in `client/` and `origin` property in `server/`: 

`/client/src/api/axios.js`:
```
    baseURL: 'http://localhost:5000',
```


`/server/server.js`:
```
    origin: 'http://localhost:5173',
```
6. Start the development server: `npm start`
7. Open your browser and navigate to `http://localhost:5173` to view the application.

## Usage

1. Register for a new account or log in with an existing account.
2. Add your home address.
3. Browse the map to view facilities.
4. Click on a facility to view detailed information.
5. Mark a facility as a favorite by clicking the star icon.
6. View the route from your home to a selected facility.

## Configuration

### Environment Variables

- `MONGO_URI`: The connection string for your MongoDB database.
- `JWT_SECRET`: The secret key used for JWT authentication.
- `VITE_GRAPH_HOPPER_API_KEY`: The secret API key for a graph hooper routing machine.

## API Documentation

This API provides endpoints for user management and facility information, including registration, authentication, password change, home address update, favourite facility management, and read operations on various facilities.

### *User Management Endpoints*

### Register User

**Endpoint:** `/api/users/register`

**Method:** `POST`

**Description:** Registers a new user.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Responses:**

- `201 Created`: User registered successfully.
- `400 Bad Request`: Invalid input or user already exists.

### Authenticate User

**Endpoint:** `/api/users/login`

**Method:** `POST`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "identifier": "string",  
  "password": "string"
}
```

**Responses:**

- `200 OK`: User authenticated successfully.
- `401 Unauthorized`: Invalid credentials.

### Change Password

**Endpoint:** `/api/users/change-password`

**Method:** `POST`

**Description:** Changes the password for the authenticated user.

**Request Body:**
```json
{
  "userId": "string",
  "currentPassword": "string",
  "newPassword": "string"
}
```

**Headers:** `Authorization: Bearer <token>`

**Responses:**

- `200 OK`: Password changed successfully.
- `400 Bad Request`: Invalid input.
- `401 Unauthorized`: Invalid token or user not authenticated.

### Update Home Address

**Endpoint:** `/api/users/update-home-address`

**Method:** `POST`

**Description:** Updates the home address for the authenticated user.

**Request Body:**
```json
{
  "userId": "string",
  "homeAddress": "string"
}
```

**Headers:** `Authorization: Bearer <token>`

**Responses:**

- `200 OK`: Home address updated successfully.
- `400 Bad Request`: Invalid input.
- `401 Unauthorized`: Invalid token or user not authenticated.

### Set Favourite Facility

**Endpoint:** `/api/users/set-favourite`

**Method:** `POST`

**Description:** Sets a favourite facility for the authenticated user.

**Request Body:**
```json
{
  "userId": "string",
  "facilityId": "string"
}
```

**Headers:** `Authorization: Bearer <token>`

**Responses:**

- `200 OK`: Favourite facility set successfully.
- `400 Bad Request`: Invalid input.
- `401 Unauthorized`: Invalid token or user not authenticated.

### Remove Favourite Facility

**Endpoint:** `/api/users/remove-favourite`

**Method:** `POST`

**Description:** Removes a favourite facility for the authenticated user.

**Request Body:**
```json
{
  "userId": "string",
  "facilityId": "string"
}
```

**Headers:** `Authorization: Bearer <token>`

**Responses:**

- `200 OK`: Favourite facility removed successfully.
- `400 Bad Request`: Invalid input.
- `401 Unauthorized`: Invalid token or user not authenticated.

### Delete User

**Endpoint:** `/api/users/:id`

**Method:** `DELETE`

**Description:** Deletes the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Responses:**

- `200 OK`: User deleted successfully.
- `401 Unauthorized`: Invalid token or user not authenticated.

### *Facility Information Endpoints*

### Facility categories:

- kindergartens
- schools
- social-child-projects
- social-young-projects

### Get `{facility_category}`

**Endpoint:** `/api/{facility_category}`

**Method:** `GET`

**Description:** Retrieves a list of facilitiess.

**Responses:**

- `200 OK`: List of `{facility_category}` retrieved successfully.

### Get `{facility_category}` by ID

**Endpoint:** `/api/{facility_category}/:id`

**Method:** `GET`

**Description:** Retrieves a facility by its ID.

**Responses:**

- `200 OK`: List of `{facility_category}` retrieved successfully.
- `400 Not Found`: `{facility_category}` not found.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact me at [mykyta.vasyliev@s2022.tu-chemnitz.de](mailto:mykyta.vasyliev@s2022.tu-chemnitz.de).
