import Link from "next/link";
import { getQuizzes, deleteQuiz } from "./actions";
import { Pencil, Trash2, Plus } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function QuizAdminPage() {
  const quizzes = await getQuizzes();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quiz Management</h1>
        <Link 
          href="/admindp/quiz/create" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Create Quiz
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-gray-600">Title</th>
              <th className="p-4 font-semibold text-gray-600">Subject</th>
              <th className="p-4 font-semibold text-gray-600">Questions</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No quizzes found. Create one to get started.
                </td>
              </tr>
            ) : (
              quizzes.map((quiz: any) => (
                <tr key={quiz.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium text-gray-800">{quiz.title}</p>
                    <p className="text-sm text-gray-500">{quiz.topicName}</p>
                  </td>
                  <td className="p-4 text-gray-600">{quiz.subject}</td>
                  <td className="p-4 text-gray-600">{quiz._count?.questions || 0}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${quiz.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {quiz.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3">
                    <Link 
                      href={`/admindp/quiz/${quiz.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={20} />
                    </Link>
                    <form action={async () => {
                      'use server';
                      await deleteQuiz(quiz.id);
                    }}>
                      <button type="submit" className="text-red-600 hover:text-red-800">
                        <Trash2 size={20} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
