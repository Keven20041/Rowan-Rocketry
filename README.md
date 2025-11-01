# Rowan Rocketry
## Project Description
This is a website for the rocketry team at Rowan University.

## Technologies
- HTML5
- W3.CSS
- JavaScript
- Node.js
- MySQL
- Docker

## Authors
- Keven Guzman (Main Developer)
- Joshua Odom (Backend Developer)
- Leo Thach (Developer)

## Usage
This website is used to inform about the rocketry club.

## Run Locally (Node.js)

Follow these steps to run the Node.js server locally.

Prerequisites
- Node.js (v20+ recommended)
- npm (comes with Node.js)

### Steps

1) Install dependencies

```bash
npm install
```

2) Start the server

To start the server, you have two options:

- **Run the server directly**:
    ```bash
    node server.js
    ```

- **Use `nodemon` for development**:
    If you want the server to restart automatically whenever you make changes, use the following command:
    ```bash
    npm run devStart
    ```

Once the server is running, open your browser and navigate to http://localhost:3000 to access the site.

## Docker Details

The Docker setup for this project utilizes three main services: Node.js, Nginx, and MySQL. Here's what each service contributes to the project:

### Node.js
The Node.js container runs the backend application using Express and EJS. It handles server-side logic, API endpoints, and communication with the MySQL database. This container ensures that the application is isolated and runs in a consistent environment, regardless of the host system.

### Nginx
The Nginx container acts as a reverse proxy and static file server. It forwards incoming HTTP requests to the Node.js container and serves static assets (e.g., HTML, CSS, JavaScript files) efficiently. Using Nginx improves performance, scalability, and security by offloading tasks like load balancing and SSL termination.

### MySQL
The MySQL container provides the database for the project. It stores all the application's data, such as user information, content, and other persistent records. The database is configured to be accessible only by the Node.js container, ensuring secure communication between the application and the database.

### What it does for this project
- **Portability**: The use of Docker ensures the project can run consistently across different environments, eliminating "it works on my machine" issues.
- **Scalability**: With Nginx as a reverse proxy, the project can handle increased traffic by scaling the Node.js service horizontally.
- **Security**: Containers isolate each service, reducing the risk of one service affecting another. Nginx also adds an additional layer of security by managing incoming requests.
- **Ease of Deployment**: Docker Compose simplifies the setup process, allowing developers to spin up the entire stack with a single command.

This architecture ensures the project is robust, maintainable, and ready for production deployment.

## Running with Docker

To run the project using Docker, follow these steps:

### Prerequisites
- Docker (v20.10+ recommended)
- Docker Compose (v2.0+ recommended)

### Steps

1) Build and start the containers

The project includes a `docker-compose.yml` file to simplify the setup. Run the following command to build and start the containers:

```bash
docker compose up --build
```

This will:
- Build the Docker images for the application and database (if applicable).
- Start the containers.

2) Access the application

Once the containers are running, open a browser and visit: http://localhost:80

3) Stop the containers

To stop the containers, press `Ctrl+C` in the terminal where `docker-compose` is running, or run:

```bash
docker compose down
```

This will stop and remove the containers. If you want to start the containers in the background, run:

```bash
docker compose up -d
```

4) Environment Variables

Ensure that the `.env` file is properly configured with the following variables before running the containers:

- `DB_HOST` (set to the database container name, e.g., `db`)
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

The `docker-compose.yml` file is configured to use these variables. There is an example `.env` file in the repository you can use.

To stop the container normally:

```bash
docker compose stop
```

To delete the container:

```bash
docker compose down
```

This won't delete the database volume that docker uses for MySQL and will be reused when the container is built again. This will prevent the first time database Initialization using `init.sql` and any values you've changed in that file. There's a fix in the next step.

5) Database Initialization (Optional)

If you need to initialize the database with a schema or seed data, you can modify the SQL file located at `./db/init.sql` that will be executed automatically when the MySQL container is started for the first time. It sets up the database for use by the server.

Verify the database initialization by connecting to the MySQL container:

```bash
docker exec -it rowan-rocketry-db-1 mysql -u rowan_user -p
```

Enter the password specified in the `DB_PASSWORD` environment variable (`.env`), and check that the schema or data has been initialized correctly.

The `init.sql` file will only be executed the first time the MySQL container is started with an empty data directory. If you need to reinitialize the database, you must remove the existing database volume using:

```bash
docker compose down -v
```

This will delete all data in the database and allow the initialization script to run again when the container is restarted.

## Contact Information 
- Phone Number: (732) 938-0650
- Website: https://www.rowanrocketry.com/
- E-mail: kevenguzman2013@gmail.com

## License
Copyright 2025 Rowan Rocketry. All rights reserved.
The website is subject to license agreement, copyright,
trademark, patent, and other laws.