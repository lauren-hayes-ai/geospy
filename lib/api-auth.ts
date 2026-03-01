import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import sql from './db';

export interface ApiKeyRecord {
  id: string;
  user_id: string;
  key_hash: string;
  key_prefix: string;
  name: string;
  daily_limit: number;
}

export async function validateApiKey(req: NextRequest): Promise<
  { key: ApiKeyRecord; remaining: number } | NextResponse
> {
  const apiKey = req.headers.get('x-api-key');
  if (!apiKey) {
    return NextResponse.json({ data: null, error: 'Missing X-API-Key header' }, { status: 401 });
  }

  const keyHash = createHash('sha256').update(apiKey).digest('hex');
  const keys = await sql<ApiKeyRecord[]>`
    SELECT * FROM geospy_api_keys WHERE key_hash = ${keyHash} AND revoked_at IS NULL LIMIT 1
  `;

  if (keys.length === 0) {
    return NextResponse.json({ data: null, error: 'Invalid or revoked API key' }, { status: 401 });
  }

  const key = keys[0];
  const [{ count }] = await sql<{ count: number }[]>`
    SELECT COUNT(*)::int as count FROM geospy_api_usage
    WHERE key_id = ${key.id} AND created_at >= CURRENT_DATE
  `;

  if (count >= key.daily_limit) {
    return NextResponse.json(
      { data: null, error: 'Daily rate limit exceeded', usage: { remaining: 0, limit: key.daily_limit } },
      { status: 429 }
    );
  }

  await sql`UPDATE geospy_api_keys SET last_used_at = now() WHERE id = ${key.id}`;
  return { key, remaining: key.daily_limit - count - 1 };
}

export async function logUsage(keyId: string, endpoint: string) {
  await sql`INSERT INTO geospy_api_usage (key_id, endpoint) VALUES (${keyId}, ${endpoint})`;
}
