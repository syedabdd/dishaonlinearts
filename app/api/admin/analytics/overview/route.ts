import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    
    // Live: last 5 minutes
    const fiveMinsAgo = new Date(now.getTime() - 5 * 60 * 1000);
    
    // Today
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // This Week (starting Sunday)
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    // This Month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [liveCount, todayCount, weekCount, monthCount, totalCount] = await Promise.all([
      prisma.visitorAnalytics.count({ where: { lastActivity: { gte: fiveMinsAgo } } }),
      prisma.visitorAnalytics.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.visitorAnalytics.count({ where: { createdAt: { gte: startOfWeek } } }),
      prisma.visitorAnalytics.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.visitorAnalytics.count(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        live: liveCount,
        today: todayCount,
        week: weekCount,
        month: monthCount,
        total: totalCount,
      }
    });
  } catch (error: any) {
    console.error("Failed to fetch overview:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch overview' }, { status: 500 });
  }
}
