"use client";

import { useState, useRef, useEffect, memo, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  X,
  Loader2,
  Sparkles,
  Plus,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { generateSlug, SUBJECT_LABELS } from "@/lib/zod/quickRevisionSchema";
import SubjectFormRenderer, {
  collectContentFields,
  subjectUsesContentJson,
} from "@/components/admin/quick-revision/forms/SubjectFormRenderer";
import {
  FormSection,
  Label,
  inputCls,
  selectCls,
  textareaCls,
} from "@/components/admin/quick-revision/forms/shared";

// ─── Constants ────────────────────────────────────────────────────────────────

const SUBJECTS = [
  "HISTORY",
  "GEOGRAPHY",
  "POLITICAL_SCIENCE",
  "ECONOMICS",
  "SOCIOLOGY",
  "PSYCHOLOGY",
  "HINDI",
  "ENGLISH",
] as const;

type McqItem = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
};

const EMPTY_MCQ: McqItem = {
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctAnswer: "",
};

// ─── MCQ Builder (memoized) ───────────────────────────────────────────────────

const McqsSection = memo(function McqsSection({
  mcqs,
  onAdd,
  onRemove,
  onChange,
}: {
  mcqs: McqItem[];
  onAdd: () => void;
  onRemove: (i: number) => void;
  onChange: (i: number, field: keyof McqItem, value: string) => void;
}) {
  return (
    <FormSection title="MCQs / Quiz (Optional)" icon="❓">
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onAdd}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition"
          >
            <Plus size={16} /> Add Question
          </button>
        </div>

        {mcqs.map((mcq, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-4 relative group"
          >
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute -top-3 -right-3 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-200"
              title="Remove Question"
            >
              <Trash2 size={16} />
            </button>

            <div>
              <Label>Question {index + 1}</Label>
              <textarea
                required
                value={mcq.question}
                onChange={(e) => onChange(index, "question", e.target.value)}
                rows={2}
                className={textareaCls}
                placeholder="Enter question..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["A", "B", "C", "D"] as const).map((opt) => (
                <div key={opt}>
                  <Label>Option {opt}</Label>
                  <input
                    required
                    value={mcq[`option${opt}` as keyof McqItem] || ""}
                    onChange={(e) =>
                      onChange(
                        index,
                        `option${opt}` as keyof McqItem,
                        e.target.value
                      )
                    }
                    className={inputCls}
                    placeholder={`Option ${opt}`}
                  />
                </div>
              ))}
            </div>

            <div>
              <Label>Correct Answer</Label>
              <select
                required
                value={mcq.correctAnswer}
                onChange={(e) =>
                  onChange(index, "correctAnswer", e.target.value)
                }
                className={selectCls}
              >
                <option value="">Select Correct Option</option>
                {["A", "B", "C", "D"].map((opt) => (
                  <option key={opt} value={opt}>
                    Option {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {mcqs.length === 0 && (
          <div className="text-center py-6 text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
            No MCQs added. Click &quot;Add Question&quot; to create one.
          </div>
        )}
      </div>
    </FormSection>
  );
});

// ─── Main Edit Page ───────────────────────────────────────────────────────────

export default function EditQuickRevisionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [mcqs, setMcqs] = useState<McqItem[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`/api/admin/quick-revision/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setSlug(d.slug || "");
        setSelectedSubject(d.subject || "");

        if (d.thumbnail) {
          setThumbnail(d.thumbnail);
          setThumbnailPreview(`/api/images/${d.thumbnail}`);
        }

        if (d.mcqs && Array.isArray(d.mcqs)) {
          setMcqs(d.mcqs);
        } else if (d.mcqQuestion && d.optionA) {
          // Fallback for legacy data format
          setMcqs([
            {
              question: d.mcqQuestion,
              optionA: d.optionA,
              optionB: d.optionB || "",
              optionC: d.optionC || "",
              optionD: d.optionD || "",
              correctAnswer: d.correctAnswer || "A",
            },
          ]);
        }
      })
      .catch(() => toast.error("Failed to load topic"))
      .finally(() => setFetching(false));
  }, [id]);

  const handleAddMcq = useCallback(
    () => setMcqs((prev) => [...prev, { ...EMPTY_MCQ }]),
    []
  );

  const handleRemoveMcq = useCallback((i: number) => {
    setMcqs((prev) => prev.filter((_, idx) => idx !== i));
  }, []);

  const handleChangeMcq = useCallback(
    (i: number, field: keyof McqItem, value: string) => {
      setMcqs((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], [field]: value };
        return next;
      });
    },
    []
  );

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/quick-revision/upload", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setThumbnail(json.path);
      setThumbnailPreview(json.url);
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const body: Record<string, any> = {};

    // Collect standard (non-content_*) fields
    fd.forEach((value, key) => {
      if (key.startsWith("content_")) return;
      body[key] = (value as string) || null;
    });

    body.thumbnail = thumbnail || null;
    body.slug = slug || generateSlug(body.title || "");
    body.displayOrder = parseInt(body.displayOrder || "0");
    body.featured = fd.get("featured") === "on";
    body.published = fd.get("published") === "on";

    // MCQs
    const validMcqs = mcqs.filter((m) => m.question.trim() !== "");
    body.mcqs = validMcqs.length > 0 ? validMcqs : null;

    // Subject-specific content
    const subject = body.subject as string;
    if (subjectUsesContentJson(subject)) {
      const content = collectContentFields(fd);
      body.content = content;
      // Clear History-specific columns
      body.reason = null;
      body.whatHappened = null;
      body.result = null;
      body.interestingFact = null;
      body.examTrick = null;
      body.dateYear = null;
      body.place = null;
      body.people = null;
    } else {
      // History / HINDI / ENGLISH — named columns used, no content JSON
      body.content = null;
    }

    try {
      const res = await fetch(`/api/admin/quick-revision/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(json.error));
      toast.success("Topic updated!");
      router.push("/admindp/quick-revision");
    } catch (err: any) {
      toast.error("Failed: " + err.message);
      setLoading(false);
    }
  }

  // ── Loading / Error states ────────────────────────────────────────────────

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-gray-500">
        Topic not found.{" "}
        <Link href="/admindp/quick-revision" className="text-blue-600 underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admindp/quick-revision"
          className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-600"
        >
          <ArrowLeft size={22} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit QuickRevision
          </h1>
          <p className="text-sm text-gray-400 line-clamp-1">{data.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Basic Info ── */}
        <FormSection title="Basic Information" icon="📋">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <Label>Title *</Label>
              <input
                required
                name="title"
                defaultValue={data.title}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                className={inputCls}
              />
            </div>

            <div>
              <Label>Slug</Label>
              <div className="flex gap-2">
                <input
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={inputCls + " font-mono text-sm"}
                />
                <button
                  type="button"
                  onClick={() => setSlug(generateSlug(data.title))}
                  className="shrink-0 px-3 py-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition"
                >
                  <Sparkles size={16} />
                </button>
              </div>
            </div>

            <div>
              <Label>Subject *</Label>
              <select
                required
                name="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={selectCls}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {SUBJECT_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Chapter</Label>
              <input
                name="chapter"
                defaultValue={data.chapter || ""}
                className={inputCls}
              />
            </div>

            <div>
              <Label>Class *</Label>
              <select
                required
                name="className"
                defaultValue={data.className}
                className={selectCls}
              >
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
                <option value="11th & 12th both">11th &amp; 12th both</option>
              </select>
            </div>
          </div>
        </FormSection>

        {/* ── Dynamic Subject Form ── */}
        {/* Pass the full data so History can read named columns,
            and non-History subjects can read data.content */}
        <SubjectFormRenderer
          subject={selectedSubject}
          defaultValues={data}
        />

        {/* ── MCQs ── */}
        <McqsSection
          mcqs={mcqs}
          onAdd={handleAddMcq}
          onRemove={handleRemoveMcq}
          onChange={handleChangeMcq}
        />

        {/* ── Thumbnail ── */}
        <FormSection title="Thumbnail Image" icon="🖼️">
          <div>
            {thumbnailPreview ? (
              <div className="relative w-48 h-32 rounded-xl overflow-hidden border border-gray-200 group">
                <img
                  src={thumbnailPreview}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setThumbnail("");
                    setThumbnailPreview("");
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex flex-col items-center gap-2 w-48 h-32 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition text-gray-400 hover:text-blue-500"
              >
                {uploading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <Upload size={24} />
                )}
                <span className="text-sm font-medium">
                  {uploading ? "Uploading..." : "Upload Image"}
                </span>
              </button>
            )}
            <input
              type="file"
              ref={fileRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </FormSection>

        {/* ── Settings ── */}
        <FormSection title="Settings" icon="⚙️">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                defaultChecked={data.featured}
                className="w-4 h-4 rounded accent-purple-600"
              />
              <label
                htmlFor="featured"
                className="font-medium text-gray-700 text-sm"
              >
                Featured
              </label>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="published"
                name="published"
                defaultChecked={data.published}
                className="w-4 h-4 rounded accent-green-600"
              />
              <label
                htmlFor="published"
                className="font-medium text-gray-700 text-sm"
              >
                Published
              </label>
            </div>
          </div>
        </FormSection>

        {/* ── Submit ── */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Link
            href="/admindp/quick-revision"
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:scale-100 flex items-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
