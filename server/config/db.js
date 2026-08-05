import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

// Cloud Postgres (Neon, etc.) requires SSL; local Postgres does not.
// Enable SSL when DATABASE_SSL=true or the connection string asks for it.
const connectionString = process.env.DATABASE_URL;
const needsSsl =
  process.env.DATABASE_SSL === 'true' || /sslmode=require/.test(connectionString || '');

export const pool = new Pool({
  connectionString,
  ssl: needsSsl ? { rejectUnauthorized: false } : false
});

// Create the inquiries table if it doesn't exist yet. Idempotent — safe to run
// on every startup.
export const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id            SERIAL PRIMARY KEY,
      name          TEXT NOT NULL,
      company_name  TEXT,
      phone         TEXT NOT NULL,
      email         TEXT NOT NULL,
      city          TEXT,
      business_type TEXT,
      bottle_size   TEXT,
      quantity      TEXT,
      message       TEXT NOT NULL,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
};
