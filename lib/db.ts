import { Pool, type QueryResultRow } from 'pg';

const globalForDb = globalThis as unknown as { kupaPool?: Pool };

export function getPool() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL tanımlı değil.');
  if (!globalForDb.kupaPool) {
    globalForDb.kupaPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      max: 10,
    });
  }
  return globalForDb.kupaPool;
}

export async function query<T extends QueryResultRow>(text: string, values: unknown[] = []) {
  return getPool().query<T>(text, values);
}

export const hasDatabase = () => Boolean(process.env.DATABASE_URL);
