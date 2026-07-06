import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Daily visitors for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const visitorsLast30Days = await prisma.visitorAnalytics.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Group by day string 'MM-DD'
    const dailyMap: Record<string, number> = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date(thirtyDaysAgo);
      d.setDate(d.getDate() + i);
      const key = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      dailyMap[key] = 0;
    }

    visitorsLast30Days.forEach(v => {
      const d = new Date(v.createdAt);
      const key = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (dailyMap[key] !== undefined) {
        dailyMap[key]++;
      }
    });

    const dailyChart = Object.keys(dailyMap).map(date => ({
      date,
      visitors: dailyMap[date]
    }));

    // 2. Top Countries, States, Cities (All time)
    const countries = await prisma.visitorAnalytics.groupBy({
      by: ['country'],
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
      take: 5
    });

    const states = await prisma.visitorAnalytics.groupBy({
      by: ['state'],
      _count: { state: true },
      orderBy: { _count: { state: 'desc' } },
      take: 5
    });

    const cities = await prisma.visitorAnalytics.groupBy({
      by: ['city'],
      _count: { city: true },
      orderBy: { _count: { city: 'desc' } },
      take: 5
    });

    const topCountries = countries.map(c => ({ name: c.country, count: c._count.country }));
    const topStates = states.map(s => ({ name: s.state, count: s._count.state }));
    const topCities = cities.map(c => ({ name: c.city, count: c._count.city }));

    return NextResponse.json({
      success: true,
      data: {
        dailyChart,
        topCountries,
        topStates,
        topCities
      }
    });
  } catch (error: any) {
    console.error("Failed to fetch charts:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch charts' }, { status: 500 });
  }
}
