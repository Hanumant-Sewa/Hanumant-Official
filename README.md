# Hanumant Seva

## Local setup

Requirements: Node.js 20+ and PostgreSQL.

1. Install all dependencies:

	```bash
	npm run install:all
	```

2. Copy the environment templates to `Backend/.env` and `frontend/.env`, then set your PostgreSQL database and service credentials. Local defaults are already provided in the working copy.

3. Create the database schema:

	```bash
	npm run db:migrate
	```

4. Run frontend and backend together:

	```bash
	npm run dev
	```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Useful commands

```bash
npm run build       # Build the frontend
npm run lint        # Run frontend ESLint checks
npm run db:generate # Regenerate the Prisma client
```

## Hostinger deployment

This project requires Hostinger Node.js application support for the backend. A static-only hosting plan can host the frontend, but cannot run Express or PostgreSQL-backed API routes.

### 1. Create production services

- Create a PostgreSQL database in Hostinger and copy its connection string.
- Create a Node.js application for `Backend`, using `server.js` as the startup file.
- Use an API subdomain such as `api.example.com` for the backend and point it to the Node.js application.
- Point the main domain, such as `example.com`, to the frontend files.

### 2. Configure backend environment variables

Add these variables in the Hostinger Node.js application settings:

```text
NODE_ENV=production
PORT=<Hostinger-provided-port>
FRONTEND_URL=https://example.com
CORS_ORIGIN=https://example.com
DATABASE_URL=<Hostinger-PostgreSQL-connection-string>
JWT_SECRET=<long-random-production-secret>
JWT_EXPIRES_IN=7d
ADMIN_SECURITY_KEY=<strong-production-admin-key>
RAZORPAY_KEY_ID=<Razorpay-production-key>
RAZORPAY_KEY_SECRET=<Razorpay-production-secret>
```

Run the database migration from the backend directory in Hostinger Terminal:

```bash
npm install
npx prisma migrate deploy
npx prisma generate
```

### 3. Build and upload the frontend

Before building, set `frontend/.env.production` locally:

```text
VITE_API_URL=https://api.example.com
VITE_PORT=5173
```

Build the frontend and upload the contents of `frontend/dist` to the main domain's document root:

```bash
npm install --prefix frontend
npm run build --prefix frontend
```

The generated `.htaccess` preserves React Router routes when a page is refreshed. Do not upload the frontend source or its local `.env` file.

### 4. Verify deployment

Open `https://api.example.com/` and confirm it returns the backend status JSON. Then open the main domain, refresh a nested route, register a test account, and verify browser requests target the API subdomain.