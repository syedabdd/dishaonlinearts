import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Attempt to extract IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    let country = 'Unknown';
    let state = 'Unknown';
    let city = 'Unknown';

    // If it's a valid remote IP, fetch location
    if (ip && ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('192.168.')) {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city`);
        const geo = await geoRes.json();
        if (geo.status === 'success') {
          country = geo.country || 'Unknown';
          state = geo.regionName || 'Unknown';
          city = geo.city || 'Unknown';
        }
      } catch (err) {
        console.error('Geolocation error:', err);
      }
    }

    // Upsert VisitorAnalytics record
    const visitor = await prisma.visitorAnalytics.upsert({
      where: { sessionId },
      update: {
        lastActivity: new Date(),
      },
      create: {
        sessionId,
        country,
        state,
        city,
      },
    });

    return NextResponse.json({ success: true, visitorId: visitor.id });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return NextResponse.json({ error: 'Failed to track visitor' }, { status: 500 });
  }
}
