"use client";

import React, { useEffect, useState } from "react";
import { Users, UserCheck, CalendarDays, Calendar, Globe, MapPin, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsDashboard() {
  const [overview, setOverview] = useState<any>(null);
  const [charts, setCharts] = useState<any>(null);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  const fetchData = async () => {
    try {
      const [overviewRes, chartsRes, visitorsRes] = await Promise.all([
        fetch("/api/admin/analytics/overview"),
        fetch("/api/admin/analytics/charts"),
        fetch("/api/admin/analytics/visitors?limit=20")
      ]);

      if (overviewRes.ok) {
        const d = await overviewRes.json();
        if (d.success) setOverview(d.data);
      }
      if (chartsRes.ok) {
        const d = await chartsRes.json();
        if (d.success) setCharts(d.data);
      }
      if (visitorsRes.ok) {
        const d = await visitorsRes.json();
        if (d.success) setVisitors(d.data);
      }
      setLastRefreshed(new Date());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000); // 10 seconds auto-refresh
    return () => clearInterval(interval);
  }, []);

  if (loading && !overview) {
    return <div className="p-8 text-center text-slate-500">Loading Analytics...</div>;
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Visitor Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time visitor tracking and geographic data.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <RefreshCw className="w-4 h-4 animate-spin-slow text-indigo-500" />
          Last Refreshed: {lastRefreshed.toLocaleTimeString()}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-3">
            <div className="absolute w-2 h-2 bg-red-500 rounded-full top-6 right-6 animate-ping" />
            <div className="absolute w-2 h-2 bg-red-500 rounded-full top-6 right-6" />
            <Users className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-slate-500">Live Visitors</p>
          <h3 className="text-2xl font-bold text-slate-800">{overview?.live || 0}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
            <UserCheck className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-slate-500">Today</p>
          <h3 className="text-2xl font-bold text-slate-800">{overview?.today || 0}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-3">
            <CalendarDays className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-slate-500">This Week</p>
          <h3 className="text-2xl font-bold text-slate-800">{overview?.week || 0}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-slate-500">This Month</p>
          <h3 className="text-2xl font-bold text-slate-800">{overview?.month || 0}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center md:col-span-3 lg:col-span-1">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3">
            <Globe className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-slate-500">Total Visitors</p>
          <h3 className="text-2xl font-bold text-slate-800">{overview?.total || 0}</h3>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Daily Visitors (Last 30 Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.dailyChart || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="visitors" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-500" />
              Top Countries
            </h3>
            <div className="space-y-3">
              {charts?.topCountries?.length ? charts.topCountries.map((c: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">{c.name}</span>
                  <span className="text-sm font-bold text-slate-800">{c.count}</span>
                </div>
              )) : <div className="text-sm text-slate-400">No data</div>}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-500" />
              Top Cities
            </h3>
            <div className="space-y-3">
              {charts?.topCities?.length ? charts.topCities.map((c: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 truncate mr-4">{c.name}</span>
                  <span className="text-sm font-bold text-slate-800">{c.count}</span>
                </div>
              )) : <div className="text-sm text-slate-400">No data</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Table Row */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Visitors</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500">
                <th className="pb-3 font-semibold">Location</th>
                <th className="pb-3 font-semibold">First Visit</th>
                <th className="pb-3 font-semibold">Last Activity</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {visitors.length ? visitors.map((v) => {
                const isLive = new Date().getTime() - new Date(v.lastActivity).getTime() < 5 * 60 * 1000;
                return (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3">
                      <div className="font-medium text-slate-800">{v.city}, {v.state}</div>
                      <div className="text-xs text-slate-500">{v.country}</div>
                    </td>
                    <td className="py-3 text-slate-600">{new Date(v.createdAt).toLocaleString()}</td>
                    <td className="py-3 text-slate-600">{new Date(v.lastActivity).toLocaleString()}</td>
                    <td className="py-3 text-right">
                      {isLive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                          Offline
                        </span>
                      )}
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">No recent visitors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
