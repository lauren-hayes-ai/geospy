import { NextRequest, NextResponse } from 'next/server';
import { createHash, randomBytes } from 'crypto';
import sql from '@/lib/db';

// TODO: Replace with Auth0 session check when Auth0 is configured
async function getAuthUserId(req: NextRequest): Promise<string | null> {
  // Placeholder: in production, extract from Auth0 session
  // For now, use a header for testing
  const userId = req.headers.get('x-auth-user-id');
  return userId;
}

async function ensureUser(authUserId: string) {
  const existing = await sql`SELECT * FROM geospy_users WHERE auth_user_id = ${authUserId} LIMIT 1`;
  if (existing.length > 0) return existing[0];
  const [user] = await sql`INSERT INTO geospy_users (auth_user_id) VALUES (${authUserId}) RETURNING *`;
  return user;
}

export async function GET(req: NextRequest) {
  const userId = await getAuthUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized — Auth0 not configured' }, { status: 401 });

  const user = await ensureUser(userId);
  const keys = await sql`
    SELECT k.id, k.key_prefix, k.name, k.daily_limit, k.created_at,
      (SELECT COUNT(*)::int FROM geospy_api_usage WHERE key_id = k.id AND created_at >= CURRENT_DATE) as usage_today
    FROM geospy_api_keys k WHERE k.user_id = ${user.id} AND k.revoked_at IS NULL ORDER BY k.created_at DESC
  `;

  return NextResponse.json({ keys });
}

export async function POST(req: NextRequest) {
  const userId = await getAuthUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized — Auth0 not configured' }, { status: 401 });

  const user = await ensureUser(userId);
  const body = await req.json().catch(() => ({}));
  const name = body.name || 'Default';

  const rawKey = 'gs_' + randomBytes(16).toString('hex');
  const keyHash = createHash('sha256').update(rawKey).digest('hex');
  const keyPrefix = rawKey.slice(0, 11);

  await sql`INSERT INTO geospy_api_keys (user_id, key_hash, key_prefix, name) VALUES (${user.id}, ${keyHash}, ${keyPrefix}, ${name})`;

  return NextResponse.json({ key: rawKey });
}
