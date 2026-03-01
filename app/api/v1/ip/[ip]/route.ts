import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, logUsage } from '@/lib/api-auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ ip: string }> }) {
  const result = await validateApiKey(req);
  if (result instanceof NextResponse) return result;

  const { ip } = await params;
  const { key, remaining } = result;

  try {
    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,city,isp,timezone,lat,lon,query`);
    const data = await res.json();

    if (data.status === 'fail') {
      return NextResponse.json({ data: null, error: 'Invalid IP address', usage: { remaining, limit: key.daily_limit } }, { status: 404 });
    }

    await logUsage(key.id, `/api/v1/ip/${ip}`);

    return NextResponse.json({
      data: { ip: data.query, country: data.country, city: data.city, isp: data.isp, timezone: data.timezone, lat: data.lat, lon: data.lon },
      error: null,
      usage: { remaining, limit: key.daily_limit },
    });
  } catch {
    return NextResponse.json({ data: null, error: 'Internal server error' }, { status: 500 });
  }
}
