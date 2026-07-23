import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Eye, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import InfoCard from "@/components/quick-revision/InfoCard";
import MCQQuiz from "@/components/quick-revision/MCQQuiz";
import ReadingProgress from "@/components/quick-revision/ReadingProgress";
import SharePanel from "@/components/quick-revision/SharePanel";
import QuickRevisionCard from "@/components/quick-revision/QuickRevisionCard";
import { SUBJECT_LABELS, SUBJECT_COLORS } from "@/lib/zod/quickRevisionSchema";

interface Props {
  params: Promise<{ slug: string }>;
}

// ─── Subject field configurations ────────────────────────────────────────────
// Defines which fields to render and in what order for each subject.
// `key` maps to the property inside item.content (for non-History)
// or item directly (for History).

type FieldConfig = {
  key: string;
  label: string;
  icon: string;
  color: string;
  variant?: "default" | "highlight" | "exam";
  fullWidth?: boolean;
};

const SUBJECT_FIELD_CONFIGS: Record<string, FieldConfig[]> = {
  HISTORY: [
    { key: "reason", label: "Reason", icon: "💭", color: "from-orange-50 to-amber-50", variant: "highlight" },
    { key: "whatHappened", label: "What Happened", icon: "📖", color: "from-blue-50 to-indigo-50" },
    { key: "result", label: "Result", icon: "🏆", color: "from-green-50 to-emerald-50", variant: "exam" },
    { key: "interestingFact", label: "Interesting Fact", icon: "✨", color: "from-purple-50 to-pink-50" },
  ],
  POLITICAL_SCIENCE: [
    { key: "definition", label: "Definition", icon: "📜", color: "from-blue-50 to-indigo-50", variant: "highlight" },
    { key: "keyFeatures", label: "Key Features", icon: "🔑", color: "from-amber-50 to-orange-50" },
    { key: "importantArticles", label: "Important Articles", icon: "📋", color: "from-sky-50 to-blue-50" },
    { key: "importantPoints", label: "Important Points", icon: "📌", color: "from-violet-50 to-purple-50" },
    { key: "importance", label: "Importance", icon: "⭐", color: "from-green-50 to-emerald-50", variant: "exam" },
    { key: "example", label: "Example", icon: "💡", color: "from-yellow-50 to-amber-50" },
    { key: "interestingFact", label: "Interesting Fact", icon: "✨", color: "from-purple-50 to-pink-50" },
  ],
  GEOGRAPHY: [
    { key: "definition", label: "Definition", icon: "🌍", color: "from-emerald-50 to-teal-50", variant: "highlight" },
    { key: "location", label: "Location", icon: "📍", color: "from-blue-50 to-sky-50" },
    { key: "formationProcess", label: "Formation / Process", icon: "⚙️", color: "from-amber-50 to-orange-50" },
    { key: "types", label: "Types", icon: "🗂️", color: "from-violet-50 to-purple-50" },
    { key: "features", label: "Features", icon: "🏔️", color: "from-cyan-50 to-blue-50" },
    { key: "importance", label: "Importance", icon: "⭐", color: "from-green-50 to-emerald-50", variant: "exam" },
    { key: "examples", label: "Examples", icon: "💡", color: "from-yellow-50 to-amber-50" },
    { key: "interestingFact", label: "Interesting Fact", icon: "✨", color: "from-purple-50 to-pink-50" },
  ],
  ECONOMICS: [
    { key: "definition", label: "Definition", icon: "📊", color: "from-purple-50 to-violet-50", variant: "highlight" },
    { key: "formula", label: "Formula", icon: "🔢", color: "from-blue-50 to-indigo-50" },
    { key: "types", label: "Types", icon: "🗂️", color: "from-amber-50 to-orange-50" },
    { key: "characteristics", label: "Characteristics", icon: "📋", color: "from-teal-50 to-cyan-50" },
    { key: "advantages", label: "Advantages", icon: "✅", color: "from-green-50 to-emerald-50", variant: "exam" },
    { key: "disadvantages", label: "Disadvantages", icon: "❌", color: "from-red-50 to-rose-50" },
    { key: "examples", label: "Examples", icon: "💡", color: "from-yellow-50 to-amber-50" },
    { key: "interestingFact", label: "Interesting Fact", icon: "✨", color: "from-purple-50 to-pink-50" },
  ],
  SOCIOLOGY: [
    { key: "meaning", label: "Meaning", icon: "💬", color: "from-rose-50 to-pink-50", variant: "highlight" },
    { key: "definition", label: "Definition", icon: "📜", color: "from-indigo-50 to-violet-50" },
    { key: "characteristics", label: "Characteristics", icon: "🔍", color: "from-amber-50 to-orange-50" },
    { key: "importance", label: "Importance", icon: "⭐", color: "from-green-50 to-emerald-50", variant: "exam" },
    { key: "examples", label: "Examples", icon: "💡", color: "from-yellow-50 to-amber-50" },
    { key: "interestingFact", label: "Interesting Fact", icon: "✨", color: "from-purple-50 to-pink-50" },
  ],
  PSYCHOLOGY: [
    { key: "definition", label: "Definition", icon: "🧠", color: "from-indigo-50 to-violet-50", variant: "highlight" },
    { key: "keyConcepts", label: "Key Concepts", icon: "🔑", color: "from-blue-50 to-sky-50" },
    { key: "characteristics", label: "Characteristics", icon: "🔍", color: "from-amber-50 to-orange-50" },
    { key: "applications", label: "Applications", icon: "⚙️", color: "from-teal-50 to-cyan-50" },
    { key: "examples", label: "Examples", icon: "💡", color: "from-yellow-50 to-amber-50", variant: "exam" },
    { key: "interestingFact", label: "Interesting Fact", icon: "✨", color: "from-purple-50 to-pink-50" },
  ],
};

// Subjects that read from named DB columns (not from content JSON)
const NAMED_COLUMN_SUBJECTS = new Set(["HISTORY", "HINDI", "ENGLISH"]);

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getData(slug: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.NODE_ENV === "production"
        ? "https://dishaartsclasses.com"
        : "http://localhost:3000");
    const res = await fetch(`${baseUrl}/api/quick-revision/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data?.item) return {};
  const item = data.item;

  const title = item.metaTitle || `${item.title} — QuickRevision`;
  const description =
    item.metaDescription ||
    `Revise "${item.title}" in 30 seconds. ${SUBJECT_LABELS[item.subject]} · Class ${item.className} · ${item.board}`;
  const imageUrl = item.thumbnail
    ? `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/images/${item.thumbnail}`
    : undefined;

  return {
    title,
    description,
    keywords: item.keywords || undefined,
    openGraph: {
      title,
      description,
      type: "article",
      ...(imageUrl && { images: [imageUrl] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function QuickRevisionDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data?.item) notFound();

  const { item, prev, next, related } = data;
  const subjectLabel = SUBJECT_LABELS[item.subject] || item.subject;
  const subjectColor =
    SUBJECT_COLORS[item.subject] || "bg-gray-100 text-gray-700 border-gray-200";

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://dishaonlineclasses.com"
      : "http://localhost:3000");
  const pageUrl = `${baseUrl}/quick-revision/${item.slug}`;

  // Resolve the content source:
  // History → flat fields directly on item
  // New subjects → item.content (JSON object)
  const isNamedColumn = NAMED_COLUMN_SUBJECTS.has(item.subject);
  const contentSource: Record<string, string | null> = isNamedColumn
    ? item
    : (item.content as Record<string, string | null>) ?? {};

  // Exam trick — shared across all subjects (stored in examTrick for History, or content.examTrick for others)
  const examTrick: string | null = isNamedColumn
    ? item.examTrick
    : contentSource.examTrick ?? null;

  // Field config for the current subject
  // Falls back to an empty array if subject has no config (HINDI, ENGLISH)
  const fieldConfig: FieldConfig[] =
    SUBJECT_FIELD_CONFIGS[item.subject] ?? [];

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description:
      item.metaDescription || `Revise "${item.title}" in 30 seconds.`,
    image: item.thumbnail
      ? `${baseUrl}/api/images/${item.thumbnail}`
      : undefined,
    author: {
      "@type": "Organization",
      name: "Disha Arts Classes",
    },
    publisher: {
      "@type": "Organization",
      name: "Disha Arts Classes",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/Logo.PNG`,
      },
    },
    datePublished: item.createdAt,
    dateModified: item.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    keywords: item.keywords,
    articleSection: subjectLabel,
  };

  return (
    <>
      {/* Reading Progress */}
      <ReadingProgress />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen" style={{ backgroundColor: "var(--bg-section)" }}>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-br from-[#1a2e6c]/5 via-transparent to-[#c0202a]/4" />
            <div className="absolute top-16 right-16 w-96 h-96 rounded-full bg-[#1a2e6c]/6 blur-3xl" />
            <div className="absolute bottom-0 left-8 w-72 h-72 rounded-full bg-[#c0202a]/5 blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 pt-28 pb-12 z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-8 flex-wrap">
              <Link href="/" className="hover:text-[#1a2e6c] transition">Home</Link>
              <span>/</span>
              <Link href="/quick-revision" className="hover:text-[#1a2e6c] transition">QuickRevision</Link>
              <span>/</span>
              <span className="text-[#1a2e6c] font-semibold line-clamp-1 max-w-48">{item.title}</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className={`inline-flex px-3 py-1.5 rounded-xl text-xs font-bold border ${subjectColor}`}>
                {subjectLabel}
              </span>
              <span className="inline-flex px-3 py-1.5 rounded-xl text-xs font-bold bg-[#1a2e6c] text-white">
                Class {item.className}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-gray-900 mb-3">
              {item.title}
            </h1>

            {/* Chapter */}
            <p className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
              <BookOpen size={14} className="text-[#1a2e6c]" />
              <span className="font-medium text-[#1a2e6c]">{item.chapter}</span>
            </p>

            {/* Meta row */}
            <div className="flex items-center gap-5 text-sm text-gray-500 mb-8 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Eye size={14} />
                {item.views.toLocaleString()} views
              </span>
            </div>

            {/* Share Panel */}
            <SharePanel title={item.title} url={pageUrl} />

            {/* Thumbnail */}
            {item.thumbnail && (
              <div className="mt-8 rounded-2xl overflow-hidden shadow-lg max-h-80">
                <img
                  src={`/api/images/${item.thumbnail}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* ── Content Section ── */}
        <section className="max-w-4xl mx-auto px-4 pb-10">

          {/* Quick Facts — History-specific metadata */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a2e6c] to-[#1a2e6c]/70 flex items-center justify-center shadow-sm">
                <span className="text-white text-sm">⚡</span>
              </div>
              <h2 className="font-bold text-[#1a2e6c] uppercase text-sm tracking-wide">
                Quick Facts
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* History-only contextual facts */}
              {item.dateYear && (
                <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                  <p className="text-xs text-amber-600 font-semibold mb-1">📅 Date</p>
                  <p className="text-sm font-bold text-gray-800">{item.dateYear}</p>
                </div>
              )}
              {item.place && (
                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                  <p className="text-xs text-emerald-600 font-semibold mb-1">📍 Place</p>
                  <p className="text-sm font-bold text-gray-800">{item.place}</p>
                </div>
              )}
              {item.people && (
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <p className="text-xs text-blue-600 font-semibold mb-1">👤 People</p>
                  <p className="text-sm font-bold text-gray-800 line-clamp-2">{item.people}</p>
                </div>
              )}
              {/* Common: Class */}
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                <p className="text-xs text-purple-600 font-semibold mb-1">🎓 Class</p>
                <p className="text-sm font-bold text-gray-800">Class {item.className}</p>
              </div>
              {/* Common: Subject */}
              <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                <p className="text-xs text-indigo-600 font-semibold mb-1">📚 Subject</p>
                <p className="text-sm font-bold text-gray-800">{subjectLabel}</p>
              </div>
            </div>
          </div>

          {/* ── Dynamic Content Cards ── */}
          {fieldConfig.length > 0 ? (
            <>
              {/* Render cards in pairs (2-column grid) */}
              {(() => {
                const cards = fieldConfig.map((field, i) => ({
                  field,
                  content: contentSource[field.key] as string | null | undefined,
                  index: i,
                })).filter((c) => c.content); // skip null/empty fields

                // Split into rows of 2
                const rows: typeof cards[] = [];
                for (let i = 0; i < cards.length; i += 2) {
                  rows.push(cards.slice(i, i + 2));
                }

                return rows.map((row, rowIdx) => (
                  <div
                    key={rowIdx}
                    className={`grid gap-4 mb-4 ${row.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
                  >
                    {row.map(({ field, content, index }) => (
                      <InfoCard
                        key={field.key}
                        icon={field.icon}
                        title={field.label}
                        content={content}
                        color={field.color}
                        index={index}
                        variant={field.variant ?? "default"}
                      />
                    ))}
                  </div>
                ));
              })()}
            </>
          ) : (
            // HINDI / ENGLISH or unknown — show raw content if any named columns exist
            <>
              {item.reason && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InfoCard icon="📝" title="Content" content={item.reason} color="from-blue-50 to-indigo-50" index={0} />
                </div>
              )}
            </>
          )}

          {/* ── Exam Trick — full-width highlighted block ── */}
          {examTrick && (
            <div className="mb-4 rounded-2xl border-2 border-[#1a2e6c]/20 bg-gradient-to-br from-[#1a2e6c]/5 to-[#c0202a]/5 p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a2e6c] to-[#c0202a] flex items-center justify-center shadow-sm">
                  <span className="text-white text-sm">🧠</span>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-[#1a2e6c]">
                  Exam Trick
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                {examTrick}
              </p>
            </div>
          )}

          {/* ── PYQ ── */}
          {item.pyq && (
            <div className="mb-4 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-teal-50 p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                  <span className="text-base">📋</span>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-green-700">
                  Previous Year Question
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed italic">
                &quot;{item.pyq}&quot;
              </p>
            </div>
          )}

          {/* ── MCQs ── */}
          {item.mcqs && Array.isArray(item.mcqs) && item.mcqs.length > 0 && (
            <div className="mb-4 space-y-4">
              {item.mcqs.map((mcq: any, index: number) => (
                <MCQQuiz
                  key={index}
                  question={mcq.question}
                  optionA={mcq.optionA}
                  optionB={mcq.optionB}
                  optionC={mcq.optionC}
                  optionD={mcq.optionD}
                  correctAnswer={mcq.correctAnswer}
                  examTrick={
                    index === item.mcqs.length - 1 ? (examTrick ?? undefined) : undefined
                  }
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Navigation ── */}
        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/quick-revision/${prev.slug}`}
                className="group flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#1a2e6c]/10 flex items-center justify-center transition-colors shrink-0">
                  <ChevronLeft size={18} className="text-gray-500 group-hover:text-[#1a2e6c]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5">Previous Topic</p>
                  <p className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-[#1a2e6c] transition-colors">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/quick-revision/${next.slug}`}
                className="group flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-right"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-400 mb-0.5">Next Topic</p>
                  <p className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-[#1a2e6c] transition-colors">
                    {next.title}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[#1a2e6c]/10 flex items-center justify-center transition-colors shrink-0">
                  <ChevronRight size={18} className="text-gray-500 group-hover:text-[#1a2e6c]" />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>

        {/* ── Related Topics ── */}
        {related && related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900">
                Related{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #1a2e6c 0%, #c0202a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Topics
                </span>
              </h2>
              <Link
                href="/quick-revision"
                className="text-sm font-semibold text-[#1a2e6c] hover:underline flex items-center gap-1"
              >
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((r: any, i: number) => (
                <QuickRevisionCard key={r.slug} item={r} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
