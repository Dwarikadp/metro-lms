# Supabase Setup

This project now uses PostgreSQL through Supabase for all persisted data.

## 1. Create a Supabase project

- Create a new project in Supabase.
- Open `Project Settings -> Database`.
- Copy the `Connection string` for the direct Postgres connection.

## 2. Set environment variables

Use these values on your backend host:

- `DATABASE_URL` or `SUPABASE_DB_URL`
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `PORT`

If your platform gives you a separate production database URL, use that as `DATABASE_URL`.
If your database password contains `@`, encode it as `%40` inside the URL.

Example direct connection:

```env
DATABASE_URL=postgresql://postgres:Dwarika%400307@db.svlnpcxylpyfjghujxae.supabase.co:5432/postgres
```

## 3. Apply the schema

Run the SQL in [`supabase/schema.sql`](/C:/Users/dell2/Desktop/metro-lms/supabase/schema.sql) inside the Supabase SQL editor.

The backend also bootstraps the schema on startup, so this step is mostly for clarity and manual setup.

## 4. Start the backend

The server entry point is [`backend/server.js`](/C:/Users/dell2/Desktop/metro-lms/backend/server.js).

Install dependencies and run the app from the repo root:

```bash
npm install
npm start
```

## 5. Frontend behavior

- The trainee app uses the same origin by default.
- The admin panel also uses the same origin by default.
- If you host the frontend separately, set `mg_api_url` in browser localStorage or wire your host to serve the backend and frontend together.

## 6. Optional migration from SQLite

If you want to move the current local SQLite data into Supabase, run the migration script once after setting `DATABASE_URL` or `SUPABASE_DB_URL`.

From the backend folder:

```bash
npm run migrate:sqlite
```

If your environment does not already have `better-sqlite3` available, install it temporarily in the backend folder first, run the migration, then remove it if you do not want to keep it.
