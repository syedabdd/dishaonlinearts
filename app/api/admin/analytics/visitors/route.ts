import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Fetch latest visitors
    const visitors = await prisma.visitorAnalytics.findMany({
      orderBy: {
        lastActivity: 'desc'
      },
      take: limit,
      select: {
        id: true,
        country: true,
        state: true,
        city: true,
        createdAt: true,
        lastActivity: true,
      }
    });

    return NextResponse.json({
      success: true,
      data: visitors
    });
  } catch (error: any) {
    console.error("Failed to fetch visitors:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch visitors' }, { status: 500 });
  }
}
