import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = req.headers.get('x-auth-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const [user] = await sql`SELECT * FROM geospy_users WHERE auth_user_id = ${userId} LIMIT 1`;
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  await sql`UPDATE geospy_api_keys SET revoked_at = now() WHERE id = ${id} AND user_id = ${user.id}`;
  return NextResponse.json({ success: true });
}
