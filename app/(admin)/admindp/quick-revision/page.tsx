import Link from "next/link";
import {
  Plus,
  Pencil,
  Eye,
  BookOpen,
  Star,
  TrendingUp,
  FileText,
} from "lucide-react";
import { getQuickRevisions, getQuickRevisionStats } from "./actions";
import { SUBJECT_LABELS } from "@/lib/zod/quickRevisionSchema";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function QuickRevisionAdminPage() {
  const [items, stats] = await Promise.all([
    getQuickRevisions(),
    getQuickRevisionStats(),
  ]);

  const subjectColors: Record<string, string> = {
    HISTORY: "bg-amber-100 text-amber-800",
    GEOGRAPHY: "bg-emerald-100 text-emerald-800",
    POLITICAL_SCIENCE: "bg-blue-100 text-blue-800",
    ECONOMICS: "bg-purple-100 text-purple-800",
    SOCIOLOGY: "bg-rose-100 text-rose-800",
    HINDI: "bg-orange-100 text-orange-800",
    ENGLISH: "bg-teal-100 text-teal-800",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">QuickRevision</h1>
          <p className="text-sm text-gray-500 mt-1">
            30-second revision topics for Arts students
          </p>
        </div>
        <Link
          href="/admindp/quick-revision/create"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 !text-white px-5 py-2.5 rounded-xl font-semibold shadow hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <Plus size={18} />
          Add QuickRevision
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Topics",
            value: stats.total,
            icon: BookOpen,
            color: "from-blue-500 to-indigo-500",
          },
          {
            label: "Published",
            value: stats.published,
            icon: Eye,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Draft",
            value: stats.draft,
            icon: FileText,
            color: "from-yellow-500 to-amber-500",
          },
          {
            label: "Featured",
            value: stats.featured,
            icon: Star,
            color: "from-purple-500 to-pink-500",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}
                >
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Most Viewed */}
      {stats.mostViewed.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-blue-600" />
            <h2 className="font-semibold text-gray-800">Most Viewed Topics</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.mostViewed.map((t: any) => (
              <Link
                key={t.id}
                href={`/quick-revision/${t.slug}`}
                target="_blank"
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-700 transition"
              >
                <Eye size={13} className="text-gray-400" />
                <span className="font-medium truncate max-w-40">{t.title}</span>
                <span className="text-gray-400 text-xs">{t.views} views</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">
            All Topics ({items.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Subject
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Views
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-gray-400"
                  >
                    <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No QuickRevision topics yet.</p>
                    <p className="text-sm mt-1">
                      Create your first topic to get started.
                    </p>
                  </td>
                </tr>
              ) : (
                items.map((item: any) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        {item.thumbnail && (
                          <img
                            src={`/api/images/${item.thumbnail}`}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover shrink-0 hidden sm:block"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-800 text-sm line-clamp-1">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          subjectColors[item.subject] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {SUBJECT_LABELS[item.subject] || item.subject}
                      </span>
                    </td>

                    <td className="px-5 py-4 hidden sm:table-cell">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold w-fit ${
                            item.published
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.published ? "Published" : "Draft"}
                        </span>
                        {item.featured && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 w-fit">
                            <Star size={10} className="fill-current" />
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Eye size={13} className="text-gray-400" />
                        {item.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admindp/quick-revision/${item.id}/edit`}
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
                        <DeleteButton id={item.id} title={item.title} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
