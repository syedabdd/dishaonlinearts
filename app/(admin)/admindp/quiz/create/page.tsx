'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuiz } from "../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateQuizPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await createQuiz({
        title: formData.get("title") as string,
        className: formData.get("className") as string,
        subject: formData.get("subject") as "HISTORY" | "GEOGRAPHY" | "POLITICAL_SCIENCE" | "ECONOMICS" | "SOCIOLOGY",
        topicName: formData.get("topicName") as string,
        description: formData.get("description") as string,
        difficulty: formData.get("difficulty") as string,
        estimatedTime: Number(formData.get("estimatedTime")),
        isPublished: formData.get("isPublished") === "on"
      });
      router.push("/admindp/quiz");
    } catch (error) {
      console.error(error);
      alert("Failed to create quiz");
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admindp/quiz" className="p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">Create New Quiz</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Quiz Title</label>
            <input required name="title" type="text" className="w-full p-2 border rounded-md" placeholder="e.g. Ohm's Law Quiz" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <select required name="className" className="w-full p-2 border rounded-md">
              <option value="">Select Class</option>
              {[6,7,8,9,10,11,12].map(c => (
                <option key={c} value={`Class ${c}`}>Class {c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <select required name="subject" className="w-full p-2 border rounded-md">
              <option value="">Select Subject</option>
              <option value="HISTORY">History</option>
              <option value="GEOGRAPHY">Geography</option>
              <option value="POLITICAL_SCIENCE">Political Science</option>
              <option value="ECONOMICS">Economics</option>
              <option value="SOCIOLOGY">SOCIOLOGY</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Topic Name</label>
            <input required name="topicName" type="text" className="w-full p-2 border rounded-md" placeholder="e.g. Electricity" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty</label>
            <select required name="difficulty" className="w-full p-2 border rounded-md">
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Estimated Time (minutes)</label>
            <input required name="estimatedTime" type="number" min="1" className="w-full p-2 border rounded-md" placeholder="e.g. 15" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea required name="description" rows={4} className="w-full p-2 border rounded-md" placeholder="Quiz description..." />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="isPublished" name="isPublished" className="w-4 h-4" />
          <label htmlFor="isPublished" className="text-sm font-medium">Publish immediately</label>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button 
            disabled={loading}
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
}
