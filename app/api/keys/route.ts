// NOTE: Auth0 integration pending Daniel's credentials (AUTH0_ISSUER_BASE_URL, AUTH0_CLIENT_ID, etc.)
// For now, key management requires passing user_email in request body (DEMO ONLY — not production-safe)
// Replace TODO markers with auth0.getSession() once credentials are provided
import { NextRequest, NextResponse } from 'next/server'
import { createHash, randomBytes } from 'crypto'
import sql from '@/lib/db'

// TODO: Replace with Auth0 session lookup
async function getOrCreateUser(email: string) {
  if (!email) return null
  const [existing] = await sql`SELECT * FROM geospy_users WHERE email = ${email} LIMIT 1`
  if (existing) return existing
  const [newUser] = await sql`INSERT INTO geospy_users (auth_user_id, email) VALUES (${email}, ${email}) RETURNING *`
  return newUser
}

export async function GET(req: NextRequest) {
  const email = req.headers.get('x-user-email')
  if (!email) return NextResponse.json({ error: 'Auth0 not configured yet. Provide X-User-Email header for demo.' }, { status: 401 })
  const user = await getOrCreateUser(email)
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  const keys = await sql`
    SELECT id, key_prefix, name, daily_limit, created_at, last_used_at,
      (SELECT COUNT(*) FROM geospy_api_usage WHERE key_id = geospy_api_keys.id AND created_at >= CURRENT_DATE)::int AS usage_today
    FROM geospy_api_keys WHERE user_id = ${user.id} AND revoked_at IS NULL ORDER BY created_at DESC
  `
  return NextResponse.json({ keys })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const email = req.headers.get('x-user-email') || body.email
  if (!email) return NextResponse.json({ error: 'Auth0 not configured yet. Provide X-User-Email or email in body.' }, { status: 401 })
  const user = await getOrCreateUser(email)
  if (!user) return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  const rawKey = `gs_${randomBytes(20).toString('hex')}`
  const keyHash = createHash('sha256').update(rawKey).digest('hex')
  const keyPrefix = rawKey.slice(0, 10)
  await sql`INSERT INTO geospy_api_keys (user_id, key_hash, key_prefix, name, daily_limit) VALUES (${user.id}, ${keyHash}, ${keyPrefix}, ${body.name || 'Default'}, 100)`
  return NextResponse.json({ key: rawKey, message: 'Save this key — not shown again. Add Auth0 credentials to secure this endpoint.' })
}
