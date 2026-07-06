'use client';

import { useState } from "react";
import { updateQuiz, addQuestion, deleteQuestion } from "../../actions";
import { Trash2 } from "lucide-react";

export default function EditForms({ quiz }: { quiz: any }) {
  const [activeTab, setActiveTab] = useState<"details" | "questions">("details");
  const [loading, setLoading] = useState(false);

  async function handleUpdateQuiz(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await updateQuiz(quiz.id, {
        title: formData.get("title") as string,
        className: formData.get("className") as string,
        subject: formData.get("subject") as string,
        topicName: formData.get("topicName") as string,
        description: formData.get("description") as string,
        difficulty: formData.get("difficulty") as string,
        estimatedTime: Number(formData.get("estimatedTime")),
        isPublished: formData.get("isPublished") === "on"
      });
      alert("Quiz updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update quiz");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      await addQuestion(quiz.id, {
        question: formData.get("question") as string,
        optionA: formData.get("optionA") as string,
        optionB: formData.get("optionB") as string,
        optionC: formData.get("optionC") as string,
        optionD: formData.get("optionD") as string,
        correctAnswer: formData.get("correctAnswer") as string,
        explanation: formData.get("explanation") as string,
      });
      form.reset();
      alert("Question added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add question");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteQuestion(id: number) {
    if(!confirm("Are you sure you want to delete this question?")) return;
    try {
      await deleteQuestion(id, quiz.id);
    } catch (error) {
      alert("Failed to delete question");
    }
  }

  return (
    <div>
      <div className="flex border-b mb-6">
        <button 
          onClick={() => setActiveTab("details")}
          className={`px-6 py-3 font-medium ${activeTab === "details" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          Quiz Details
        </button>
        <button 
          onClick={() => setActiveTab("questions")}
          className={`px-6 py-3 font-medium ${activeTab === "questions" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          Manage Questions ({quiz.questions?.length || 0})
        </button>
      </div>

      {activeTab === "details" && (
        <form onSubmit={handleUpdateQuiz} className="bg-white p-6 rounded-lg shadow space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quiz Title</label>
              <input required name="title" defaultValue={quiz.title} type="text" className="w-full p-2 border rounded-md" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <select required name="className" defaultValue={quiz.className} className="w-full p-2 border rounded-md">
                {[6,7,8,9,10,11,12].map(c => (
                  <option key={c} value={`Class ${c}`}>Class {c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <select required name="subject" defaultValue={quiz.subject} className="w-full p-2 border rounded-md">
                <option value="HISTORY">History</option>
                <option value="GEOGRAPHY">Geography</option>
                <option value="POLITICAL_SCIENCE">Political Science</option>
                <option value="ECONOMICS">Economics</option>
                <option value="SOCIOLOGY">SOCIOLOGY</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Topic Name</label>
              <input required name="topicName" defaultValue={quiz.topicName} type="text" className="w-full p-2 border rounded-md" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <select required name="difficulty" defaultValue={quiz.difficulty} className="w-full p-2 border rounded-md">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Estimated Time (minutes)</label>
              <input required name="estimatedTime" defaultValue={quiz.estimatedTime} type="number" min="1" className="w-full p-2 border rounded-md" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea required name="description" defaultValue={quiz.description} rows={4} className="w-full p-2 border rounded-md" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="isPublished" name="isPublished" defaultChecked={quiz.isPublished} className="w-4 h-4" />
            <label htmlFor="isPublished" className="text-sm font-medium">Publish immediately</label>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button disabled={loading} type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}

      {activeTab === "questions" && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Existing Questions</h2>
            {quiz.questions && quiz.questions.length > 0 ? (
              <div className="space-y-4">
                {quiz.questions.map((q: any, i: number) => (
                  <div key={q.id} className="p-4 border rounded-md relative bg-gray-50">
                    <button 
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                    <p className="font-semibold mb-2">Q{i + 1}. {q.question}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                      <div className={q.correctAnswer === "A" ? "font-bold text-green-600" : ""}>A: {q.optionA}</div>
                      <div className={q.correctAnswer === "B" ? "font-bold text-green-600" : ""}>B: {q.optionB}</div>
                      <div className={q.correctAnswer === "C" ? "font-bold text-green-600" : ""}>C: {q.optionC}</div>
                      <div className={q.correctAnswer === "D" ? "font-bold text-green-600" : ""}>D: {q.optionD}</div>
                    </div>
                    {q.explanation && (
                      <div className="text-sm text-gray-500 mt-2 border-t pt-2">
                        <span className="font-semibold">Explanation: </span> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4 border rounded-md">No questions added yet.</p>
            )}
          </div>

          <form onSubmit={handleAddQuestion} className="bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-lg font-bold border-b pb-2">Add New Question</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Question Text</label>
              <textarea required name="question" rows={2} className="w-full p-2 border rounded-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Option A</label>
                <input required name="optionA" type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Option B</label>
                <input required name="optionB" type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Option C</label>
                <input required name="optionC" type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Option D</label>
                <input required name="optionD" type="text" className="w-full p-2 border rounded-md" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Correct Answer</label>
              <select required name="correctAnswer" className="w-full p-2 border rounded-md">
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Explanation (Optional)</label>
              <textarea name="explanation" rows={2} className="w-full p-2 border rounded-md" placeholder="Why is this answer correct?" />
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button disabled={loading} type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50">
                {loading ? "Adding..." : "Add Question"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
