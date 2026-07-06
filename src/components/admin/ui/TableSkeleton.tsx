"use client";

export default function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number, columns?: number }) {
  return (
    <div className="overflow-x-auto w-full animate-pulse">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="py-3 px-4">
                <div className="h-4 bg-slate-200 rounded w-20"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: columns }).map((_, j) => (
                <td key={j} className="py-4 px-4">
                  <div className={`h-4 bg-slate-200 rounded ${j === 0 ? 'w-8' : j === 1 ? 'w-16 h-10' : 'w-full max-w-[150px]'}`}></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
