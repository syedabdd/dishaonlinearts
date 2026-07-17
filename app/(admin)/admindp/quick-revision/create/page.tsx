"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, X, Loader2, Sparkles, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { generateSlug, SUBJECT_LABELS } from "@/lib/zod/quickRevisionSchema";

const SUBJECTS = [
  "HISTORY",
  "GEOGRAPHY",
  "POLITICAL_SCIENCE",
  "ECONOMICS",
  "SOCIOLOGY",
  "HINDI",
  "ENGLISH",
];
const BOARDS = ["Bihar Board", "CBSE", "UP Board", "All Boards"];
const EXAM_LEVELS = ["School Exam", "Board Exam", "Competitive"];

export default function CreateQuickRevisionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [mcqs, setMcqs] = useState<{question: string, optionA: string, optionB: string, optionC: string, optionD: string, correctAnswer: string}[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setTitle(val);
    setSlug(generateSlug(val));
  }

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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setThumbnail(data.path);
      setThumbnailPreview(data.url);
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
    const body: any = {};
    fd.forEach((value, key) => {
      if (key === "featured" || key === "published") {
        body[key] = value === "on" || value === "true";
      } else {
        body[key] = value || null;
      }
    });
    body.thumbnail = thumbnail || null;
    body.slug = slug || generateSlug(body.title || "");
    body.displayOrder = parseInt(body.displayOrder || "0");
    body.featured = fd.get("featured") === "on";
    body.published = fd.get("published") === "on";
    // Process MCQs
    const validMcqs = mcqs.filter(m => m.question.trim() !== "");
    if (validMcqs.length > 0) {
      body.mcqs = validMcqs;
    } else {
      body.mcqs = null;
    }

    try {
      const res = await fetch("/api/admin/quick-revision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data.error));
      toast.success("QuickRevision topic created!");
      router.push("/admindp/quick-revision");
    } catch (err: any) {
      toast.error("Failed to create: " + err.message);
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admindp/quick-revision"
          className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-600"
        >
          <ArrowLeft size={22} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create QuickRevision Topic
          </h1>
          <p className="text-sm text-gray-500">
            Add a new 30-second revision topic for students
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Section: Basic Info ── */}
        <FormSection title="Basic Information" icon="📋">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <Label>Title *</Label>
              <input
                required
                name="title"
                value={title}
                onChange={handleTitleChange}
                className={inputCls}
                placeholder="e.g. Battle of Plassey 1757"
              />
            </div>

            <div>
              <Label>Slug (Auto-generated)</Label>
              <div className="flex gap-2">
                <input
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={inputCls + " font-mono text-sm"}
                  placeholder="auto-generated-slug"
                />
                <button
                  type="button"
                  onClick={() => setSlug(generateSlug(title))}
                  className="shrink-0 px-3 py-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition"
                  title="Regenerate slug"
                >
                  <Sparkles size={16} />
                </button>
              </div>
            </div>

            <div>
              <Label>Subject *</Label>
              <select required name="subject" className={selectCls}>
                <option value="">Select Subject</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {SUBJECT_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Class *</Label>
              <select required name="className" className={selectCls}>
                <option value="">Select Class</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
          </div>
        </FormSection>

        {/* ── Section: Context ── */}
        <FormSection title="Contextual Details" icon="🗓️">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <Label>Date / Year</Label>
              <input
                name="dateYear"
                className={inputCls}
                placeholder="e.g. 23 June 1757"
              />
            </div>
            <div>
              <Label>Place</Label>
              <input
                name="place"
                className={inputCls}
                placeholder="e.g. Plassey, Bengal"
              />
            </div>
            <div>
              <Label>People / Person</Label>
              <input
                name="people"
                className={inputCls}
                placeholder="e.g. Robert Clive, Siraj ud-Daulah"
              />
            </div>
          </div>
        </FormSection>

        {/* ── Section: Core Content ── */}
        <FormSection title="Core Content *" icon="📝">
          <div className="space-y-5">
            <div>
              <Label>Reason *</Label>
              <textarea
                required
                name="reason"
                rows={3}
                className={textareaCls}
                placeholder="Why did this happen? What was the cause?"
              />
            </div>
            <div>
              <Label>What Happened *</Label>
              <textarea
                required
                name="whatHappened"
                rows={4}
                className={textareaCls}
                placeholder="Describe the event in detail..."
              />
            </div>
            <div>
              <Label>Result *</Label>
              <textarea
                required
                name="result"
                rows={3}
                className={textareaCls}
                placeholder="What was the outcome?"
              />
            </div>
            <div>
              <Label>Interesting Fact *</Label>
              <textarea
                required
                name="interestingFact"
                rows={2}
                className={textareaCls}
                placeholder="A fascinating fact students will remember..."
              />
            </div>
            <div>
              <Label>Exam Trick *</Label>
              <textarea
                required
                name="examTrick"
                rows={2}
                className={textareaCls}
                placeholder="Memory trick, mnemonic, or important point for exams..."
              />
            </div>
          </div>
        </FormSection>

        {/* ── Section: MCQs ── */}
        <FormSection title="MCQs (Optional)" icon="❓">
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMcqs([...mcqs, { question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "" }])}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition"
              >
                <Plus size={16} /> Add Question
              </button>
            </div>
            
            {mcqs.map((mcq, index) => (
              <div key={index} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-4 relative group">
                <button
                  type="button"
                  onClick={() => {
                    const newMcqs = [...mcqs];
                    newMcqs.splice(index, 1);
                    setMcqs(newMcqs);
                  }}
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
                    onChange={(e) => {
                      const newMcqs = [...mcqs];
                      newMcqs[index].question = e.target.value;
                      setMcqs(newMcqs);
                    }}
                    rows={2}
                    className={textareaCls}
                    placeholder="Enter question..."
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["A", "B", "C", "D"].map((opt) => (
                    <div key={opt}>
                      <Label>Option {opt}</Label>
                      <input
                        required
                        value={mcq[`option${opt}` as keyof typeof mcq]}
                        onChange={(e) => {
                          const newMcqs = [...mcqs];
                          (newMcqs[index] as any)[`option${opt}`] = e.target.value;
                          setMcqs(newMcqs);
                        }}
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
                    onChange={(e) => {
                      const newMcqs = [...mcqs];
                      newMcqs[index].correctAnswer = e.target.value;
                      setMcqs(newMcqs);
                    }}
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
                No MCQs added. Click "Add Question" to create one.
              </div>
            )}
          </div>
        </FormSection>

        {/* ── Section: Media ── */}
        <FormSection title="Thumbnail Image" icon="🖼️">
          <div>
            {thumbnailPreview ? (
              <div className="relative w-48 h-32 rounded-xl overflow-hidden border border-gray-200 group">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail"
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
                  {uploading ? "Uploading..." : "Upload Thumbnail"}
                </span>
                <span className="text-xs">JPG, PNG, WebP · Max 5MB</span>
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

        {/* ── Section: Settings ── */}
        <FormSection title="Settings" icon="⚙️">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <Label>Display Order</Label>
              <input
                name="displayOrder"
                type="number"
                defaultValue={0}
                className={inputCls}
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                className="w-4 h-4 rounded accent-purple-600"
              />
              <label htmlFor="featured" className="font-medium text-gray-700 text-sm">
                Featured
              </label>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="published"
                name="published"
                className="w-4 h-4 rounded accent-green-600"
              />
              <label htmlFor="published" className="font-medium text-gray-700 text-sm">
                Publish Immediately
              </label>
            </div>
          </div>
        </FormSection>

        {/* Submit */}
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
            {loading ? "Creating..." : "Create Topic"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Helpers ──
function FormSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}
    </label>
  );
}

const inputCls =
  "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition bg-white text-gray-800 placeholder-gray-400";

const selectCls =
  "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition bg-white text-gray-800 appearance-none";

const textareaCls =
  "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition bg-white text-gray-800 placeholder-gray-400 resize-none";
