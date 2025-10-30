# RowanRocketry
## Project Description
This is a website for the rocketry team at Rowan University.

## Technologies
- HTML5
- W3.CSS
- JavaScript
- SQL (Dev-Branch)
- Node.js

## Version
2.322.0

## Authors
- Keven Guzman (Main Developer)
- Joshua Odom (Backend Developer)
- Leo Thach (Developer)

## Usage
This website is used to inform about the rocketry club

## Run locally (Node + Express + MySQL)

Follow these steps to run the Express server locally and connect it to a MySQL database.

Prerequisites
- Node.js (v16+ recommended)
- npm (comes with Node.js)
- MySQL Server (Community Server or compatible)

1) Install dependencies

```powershell
npm install
```

2) Create the MySQL database and user **(OPTIONAL)**

**The next two steps are optional if you just want to test the server.**

Run these commands in a MySQL shell or a client (adjust names/passwords as needed):

```sql
CREATE DATABASE rowan_rocketry CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'rowan_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON rowan_rocketry.* TO 'rowan_user'@'localhost';
FLUSH PRIVILEGES;
```

If you already have a schema or seed data, import it now (some details are provided in schema.sql file).

3) Configure the database **(OPTIONAL)**

The provided `database.js` uses the following environment variables from `.env`:

- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME

Change these variables for the server to connect to the MYSQL database.

4) Start the server

The project includes a `devStart` script that uses `nodemon` to run `server.js`.

```powershell
npm run devStart
```

Open a browser and visit http://localhost:3000 to view the site.

## Notes
- The `server.js` currently references EJS templates under `public/` and serves static files from the `public` folder.

## Contact Information 
- Phone number: 732=938-0650
- Website: RowanRocketry.com
- E-mail: kevenguzman2013@gmail.com

## License
Copyright 2024 rowanrocketry.com. All rights reserved.
The website is subject to license agreement, copyright,
trademark, patent, and other laws.