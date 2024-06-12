# exim | Educational and Care System Interaction Map of Chemnitz 

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
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

1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies
4. Create a `.env` file in the root directory and add your environment variables (e.g., database connection string, JWT secret).
5. Start the development server
6. Open your browser and navigate to `http://localhost:{your-port}` to view the application.

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

## API Documentation



## Contact

For any questions or inquiries, please contact me at [mykyta.vasyliev@s2022.tu-chemnitz.de](mailto:mykyta.vasyliev@s2022.tu-chemnitz.de).
