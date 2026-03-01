import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('DATABASE_URL is required'); process.exit(1); }

const sql = postgres(DATABASE_URL, { ssl: { rejectUnauthorized: false } });

async function migrate() {
  console.log('Running GeoSpy migrations...');

  await sql`CREATE TABLE IF NOT EXISTS geospy_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id TEXT UNIQUE NOT NULL,
    email TEXT,
    plan TEXT DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT now()
  )`;
  console.log('✓ geospy_users');

  await sql`CREATE TABLE IF NOT EXISTS geospy_api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES geospy_users(id),
    key_hash TEXT UNIQUE NOT NULL,
    key_prefix TEXT NOT NULL,
    name TEXT DEFAULT 'Default',
    daily_limit INT DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT now(),
    last_used_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ
  )`;
  console.log('✓ geospy_api_keys');

  await sql`CREATE TABLE IF NOT EXISTS geospy_api_usage (
    id BIGSERIAL PRIMARY KEY,
    key_id UUID REFERENCES geospy_api_keys(id),
    endpoint TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
  )`;
  console.log('✓ geospy_api_usage');

  console.log('All migrations complete!');
  await sql.end();
}

migrate().catch((err) => { console.error('Migration failed:', err); process.exit(1); });
