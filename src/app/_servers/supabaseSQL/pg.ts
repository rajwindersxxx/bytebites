//  not used yet
import { Pool } from 'pg';
// lib/db.js

const pool = new Pool({
  connectionString: process.env.SUPABASE_RAW_URL,
  ssl: { rejectUnauthorized: false }, // required for Supabase
});

export default pool;
