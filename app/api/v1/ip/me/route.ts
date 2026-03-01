import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, logUsage } from '@/lib/api-auth';

export async function GET(req: NextRequest) {
  const result = await validateApiKey(req);
  if (result instanceof NextResponse) return result;

  const { key, remaining } = result;
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || '0.0.0.0';

  try {
    const res = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,country,city,isp,timezone,lat,lon,query`);
    const data = await res.json();

    await logUsage(key.id, '/api/v1/ip/me');

    return NextResponse.json({
      data: { ip: data.query || clientIp, country: data.country, city: data.city, isp: data.isp, timezone: data.timezone, lat: data.lat, lon: data.lon },
      error: null,
      usage: { remaining, limit: key.daily_limit },
    });
  } catch {
    return NextResponse.json({ data: null, error: 'Internal server error' }, { status: 500 });
  }
}
