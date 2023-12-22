# Library Books Manager

This project implements an Angular 16 client and nest js backend which together facilitate create, read, update, delete operations on a Book data model. The Nest.js API is backed by a MongoDB database. Several other features such as (mock) authentication and access control, book search, and more. A `app/populate-db.js` script is provided to populate the database, if desired.

## Project Structure

The project is structured into two main directories:

- `app`: Contains the Nest.js backend application, utilizing Mongoose for MongoDB interactions..
- `ui`: Contains the Angular 16 frontend application.

A `docker-compose.yml` file is provided to ease the process of building and running the applications along with a MongoDB instance.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

### Building and Running the Applications

1. Clone this repository to your local machine:
2. Install dependencies:
   ```bash
   cd app && npm install
   cd ui && npm install
   ```   

3. Build and start the applications using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the applications:
    - Frontend: Open http://localhost:4200 in your web browser.
    - Backend: Send requests to http://localhost:3000.

5. You may use the api.rest file to interact with the API. 

### Database
A MongoDB instance is included in the `docker-compose.yml` file, and the Nest.js application is configured to interact with MongoDB using Mongoose. The connection URL is configured in the `docker-compose.yml` file, and can be updated to match your preferences.

### Features
- A basic `auth/login` route is provided.  It can be used to generate an auth JWT.
   ```
   Route:   /auth/login
   Method:  POST
   Body: {
            "username": string,
            "password": string
         }
   Notes:  Any username/password combination will return a valid JWT that expires in 10m
   ```
- Hot Reloading: Hot reloading is enabled for both the frontend and backend applications, allowing for real-time updates as you modify the code.

## License
This project is licensed under the MIT License - see the [mit-license.org](https://mit-license.org/)  for details.

## Acknowledgments
- [Angular](https://angular.io/)
- [Nest.js](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)