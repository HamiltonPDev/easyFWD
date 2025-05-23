# easyFWD – Redesigned website for 4U Solutions BV

This project is a redesigned version of the website for **4U Solutions BV**.

## Getting Started

Follow the steps below to run the project locally:

```
npm install
npm run dev
```

The application will run at:  
[`http://localhost:3000`](http://localhost:3000)

## Notes

- This project is **not publicly available** on GitHub due to privacy considerations for the client.

## Admin Login (Development Only)

To access the admin dashboard locally, use the following credentials:

**Email:** `admin@easyfwd.com`
**Password:** `admin1234`

> ⚠️ **Warning:** These credentials are for local development and testing only. Do not use them in production or share them publicly.

### Creating a Test Admin User

To quickly create the default admin user for local development, visit this URL in your browser after starting the app:

```
http://localhost:3000/api/test-user
```

This will ensure the admin user exists in your local database with the credentials above.

## Running with Docker

This project includes a `docker-compose.yml` for easy local development with Docker. It will start both the Next.js app and a MongoDB instance.

### 1. Build and Start the Containers

```
docker-compose up --build
```

- The app will be available at [http://localhost:3000](http://localhost:3000)
- MongoDB will be available at [mongodb://localhost:27017](mongodb://localhost:27017)

### 2. Stopping the Containers

Press `Ctrl+C` in the terminal, then run:

```
docker-compose down
```

> **Note:** The default admin credentials are listed above. Data will persist in the `mongo-data` volume unless you remove it with `docker volume rm <volume-name>`.