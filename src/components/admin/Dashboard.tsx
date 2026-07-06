"use client";

import {
  Radio,
  Eye,
  FileText,
  HelpCircle,
  CalendarDays,
  MessageSquare,
  Clock3,
} from "lucide-react";

interface DashboardProps {
  metrics: {
    totalDoubts: number;
    studyMaterials: number;
    liveVisitors: number;
    todaysTraffic: number;
  };
  recentFeedback: any[];
}

export default function Dashboard({ metrics, recentFeedback }: DashboardProps) {
  // Generate today's date dynamically
  const todayDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const stats = [
    {
      title: "LIVE VISITORS",
      value: metrics.liveVisitors,
      icon: Radio,
      color: "bg-green-100 text-green-600",
      border: "border-green-500",
    },
    {
      title: "TODAY'S TRAFFIC",
      value: metrics.todaysTraffic,
      icon: Eye,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "STUDY MATERIALS",
      value: metrics.studyMaterials,
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "TOTAL DOUBTS",
      value: metrics.totalDoubts,
      icon: HelpCircle,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      {/* Welcome Card */}
      <div className="bg-white rounded-3xl shadow-sm border-l-4 border-indigo-950 p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Welcome back, Admin 👋
          </h1>

          <p className="text-gray-500 mt-2 text-base md:text-lg">
            Here is your platform's live overview for today.
          </p>
        </div>

        <div className="bg-blue-50 text-blue-600 px-5 py-3 rounded-xl flex items-center gap-2 font-semibold self-start lg:self-auto w-full lg:w-auto justify-center lg:justify-start">
          <CalendarDays size={18} />
          {todayDate}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`bg-white rounded-2xl p-7 shadow-sm border ${
                item.border || "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-2xl ${item.color}`}>
                  <Icon className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-5xl font-bold text-slate-900">
                    {item.value}
                  </h2>

                  <p className="text-xs tracking-widest font-bold text-gray-500 mt-2">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 mt-8 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-slate-900" />
            <h2 className="text-2xl font-bold text-slate-900">
              Recent Student Feedback
            </h2>
          </div>
        </div>

        {recentFeedback.length === 0 ? (
          <p className="text-slate-500">No feedback submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 text-gray-400 text-sm">
                  <th className="text-left py-4">TOPIC</th>
                  <th className="text-left py-4">FEEDBACK</th>
                  <th className="text-left py-4">DATE</th>
                </tr>
              </thead>

              <tbody>
                {recentFeedback.map((feedback) => (
                  <tr
                    key={feedback.id}
                    className="border-b border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="py-5 font-semibold text-slate-800">
                      {feedback.topicTitle}
                    </td>

                    <td className="text-slate-600 max-w-md truncate pr-4">
                      {feedback.feedbackText}
                    </td>

                    <td>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock3 size={16} />
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
