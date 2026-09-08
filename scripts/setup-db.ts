import { Pool } from 'pg';
import nextEnv from '@next/env';
import { menuCategories } from '../data/menu';

nextEnv.loadEnvConfig(process.cwd());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

await pool.query(`CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL DEFAULT '🍽️',
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
)`);

await pool.query(`CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  category_id text NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  name text NOT NULL,
  description text,
  price numeric(10,2),
  popular boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  image_data bytea,
  image_type text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
)`);

await pool.query(`CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  brand_name text NOT NULL DEFAULT 'KUPA',
  brand_subtitle text NOT NULL DEFAULT 'GAME CAFE',
  eyebrow text NOT NULL DEFAULT 'MOLA VER, LEZZETİ SEÇ',
  headline text NOT NULL DEFAULT 'Masadaki en iyi hamle.',
  description text NOT NULL DEFAULT 'Kahveden atıştırmalığa, aradığın her şey bir dokunuş uzağında.',
  venue_note text NOT NULL DEFAULT 'Siparişini garsonumuza iletebilirsin. Afiyet olsun!',
  updated_at timestamptz NOT NULL DEFAULT now()
)`);

await pool.query(`INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING`);

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

await pool.query(`INSERT INTO ad_popup (id) VALUES (1) ON CONFLICT (id) DO NOTHING`);

for (const [categoryIndex, category] of menuCategories.entries()) {
  await pool.query(`INSERT INTO categories (id, name, icon, sort_order) VALUES ($1,$2,$3,$4)
    ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, icon=EXCLUDED.icon, sort_order=EXCLUDED.sort_order`,
    [category.id, category.name, category.icon, categoryIndex]);
  for (const [productIndex, product] of category.items.entries()) {
    await pool.query(`INSERT INTO products (id, category_id, name, description, price, popular, sort_order)
      VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO NOTHING`,
      [product.id, category.id, product.name, product.description ?? null, product.price ?? null, product.popular ?? false, productIndex]);
  }
}

await pool.end();
console.log('PostgreSQL şeması hazır ve menü verileri aktarıldı.');
