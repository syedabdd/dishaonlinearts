"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
  const [mcqs, setMcqs] = useState<{question: string, optionA: string, optionB: string, optionC: string, optionD: string, correctAnswer: string}[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`/api/admin/quick-revision/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setSlug(d.slug || "");
        if (d.thumbnail) {
          setThumbnail(d.thumbnail);
          setThumbnailPreview(`/api/images/${d.thumbnail}`);
        }
        
        if (d.mcqs && Array.isArray(d.mcqs)) {
          setMcqs(d.mcqs);
        } else if (d.mcqQuestion && d.optionA) {
          // Fallback for very old data format if it existed before previous migration
          setMcqs([{
            question: d.mcqQuestion,
            optionA: d.optionA,
            optionB: d.optionB || "",
            optionC: d.optionC || "",
            optionD: d.optionD || "",
            correctAnswer: d.correctAnswer || "A"
          }]);
        }
      })
      .catch(() => toast.error("Failed to load topic"))
      .finally(() => setFetching(false));
  }, [id]);

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
    const body: any = {};
    fd.forEach((value, key) => {
      body[key] = value || null;
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
          <h1 className="text-2xl font-bold text-gray-900">Edit QuickRevision</h1>
          <p className="text-sm text-gray-400 line-clamp-1">{data.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
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
              <select required name="subject" defaultValue={data.subject} className={selectCls}>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{SUBJECT_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Class *</Label>
              <select required name="className" defaultValue={data.className} className={selectCls}>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
          </div>
        </FormSection>

        {/* Context */}
        <FormSection title="Contextual Details" icon="🗓️">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <Label>Date / Year</Label>
              <input name="dateYear" defaultValue={data.dateYear || ""} className={inputCls} />
            </div>
            <div>
              <Label>Place</Label>
              <input name="place" defaultValue={data.place || ""} className={inputCls} />
            </div>
            <div>
              <Label>People / Person</Label>
              <input name="people" defaultValue={data.people || ""} className={inputCls} />
            </div>
          </div>
        </FormSection>

        {/* Core Content */}
        <FormSection title="Core Content *" icon="📝">
          <div className="space-y-5">
            {[
              { name: "reason", label: "Reason *", required: true },
              { name: "whatHappened", label: "What Happened *", required: true },
              { name: "result", label: "Result *", required: true },
              { name: "interestingFact", label: "Interesting Fact *", required: true },
              { name: "examTrick", label: "Exam Trick *", required: true },
            ].map((f) => (
              <div key={f.name}>
                <Label>{f.label}</Label>
                <textarea
                  required={f.required}
                  name={f.name}
                  rows={3}
                  defaultValue={data[f.name] || ""}
                  className={textareaCls}
                />
              </div>
            ))}
          </div>
        </FormSection>

        {/* MCQs */}
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
                        value={mcq[`option${opt}` as keyof typeof mcq] || ""}
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

        {/* Thumbnail */}
        <FormSection title="Thumbnail Image" icon="🖼️">
          <div>
            {thumbnailPreview ? (
              <div className="relative w-48 h-32 rounded-xl overflow-hidden border border-gray-200 group">
                <img src={thumbnailPreview} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setThumbnail(""); setThumbnailPreview(""); }}
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
                {uploading ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} />}
                <span className="text-sm font-medium">{uploading ? "Uploading..." : "Upload Image"}</span>
              </button>
            )}
            <input type="file" ref={fileRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
          </div>
        </FormSection>

        {/* Settings */}
        <FormSection title="Settings" icon="⚙️">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <Label>Display Order</Label>
              <input name="displayOrder" type="number" defaultValue={data.displayOrder} className={inputCls} />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" id="featured" name="featured" defaultChecked={data.featured} className="w-4 h-4 rounded accent-purple-600" />
              <label htmlFor="featured" className="font-medium text-gray-700 text-sm">Featured</label>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" id="published" name="published" defaultChecked={data.published} className="w-4 h-4 rounded accent-green-600" />
              <label htmlFor="published" className="font-medium text-gray-700 text-sm">Published</label>
            </div>
          </div>
        </FormSection>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Link href="/admindp/quick-revision" className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:scale-100 flex items-center gap-2">
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
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
  return <label className="block text-sm font-medium text-gray-700 mb-1.5">{children}</label>;
}

const inputCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition bg-white text-gray-800 placeholder-gray-400";
const selectCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition bg-white text-gray-800 appearance-none";
const textareaCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition bg-white text-gray-800 placeholder-gray-400 resize-none";
