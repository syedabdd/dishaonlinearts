import { getQuizById } from "../../actions";
import EditForms from "./EditForms";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quizId = parseInt(id);
  if (isNaN(quizId)) notFound();

  const quiz = await getQuizById(quizId);
  if (!quiz) notFound();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admindp/quiz" className="p-2 hover:bg-gray-100 rounded-full transition">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">Edit Quiz: {quiz.title}</h1>
      </div>
      
      <EditForms quiz={quiz} />
    </div>
  );
}
