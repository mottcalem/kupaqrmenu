import { Pool } from 'pg';
import nextEnv from '@next/env';

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL tanımlı değil.');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
try {
  await pool.query(`CREATE TABLE IF NOT EXISTS ad_popup (
    id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    enabled boolean NOT NULL DEFAULT false,
    delay_seconds integer NOT NULL DEFAULT 5 CHECK (delay_seconds BETWEEN 0 AND 300),
    title text NOT NULL DEFAULT '',
    body text NOT NULL DEFAULT '',
    cta_label text NOT NULL DEFAULT '',
    cta_url text NOT NULL DEFAULT '',
    image_data bytea,
    image_type text,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`);
  await pool.query(
    'INSERT INTO ad_popup (id) VALUES (1) ON CONFLICT (id) DO NOTHING',
  );
  await pool.query(
    'ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_image_data bytea',
  );
  await pool.query(
    'ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS hero_image_type text',
  );
  console.log(
    'PostgreSQL güncellemesi tamamlandı. Mevcut menü ve ayarlar değiştirilmedi.',
  );
} finally {
  await pool.end();
}
