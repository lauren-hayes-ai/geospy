import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const email = req.headers.get('x-user-email')
  if (!email) return NextResponse.json({ error: 'Auth0 not configured. Provide X-User-Email header.' }, { status: 401 })
  const [user] = await sql`SELECT id FROM geospy_users WHERE email = ${email} LIMIT 1`
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  await sql`UPDATE geospy_api_keys SET revoked_at = now() WHERE id = ${id} AND user_id = ${user.id}`
  return NextResponse.json({ revoked: true })
}
