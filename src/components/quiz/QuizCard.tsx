'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, BookOpen, BarChart } from "lucide-react";

interface QuizCardProps {
  quiz: {
    id: number;
    title: string;
    subject: string;
    topicName: string;
    difficulty: string;
    estimatedTime: number;
    _count?: {
      questions: number;
    };
  };
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'HISTORY': return 'bg-blue-100 text-blue-800';
      case 'GEOGRAPHY': return 'bg-purple-100 text-purple-800';
      case 'POLITICAL_SCIENCE': return 'bg-green-100 text-green-800';
      case 'ECONOMICS': return 'bg-red-100 text-red-800';
      case 'SOCIOLOGY': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group"
    >
      <div className="p-6 grow relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-50 to-purple-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${getSubjectColor(quiz.subject)}`}>
            {quiz.subject}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10 group-hover:text-blue-600 transition-colors">
          {quiz.title}
        </h3>
        <p className="text-sm text-gray-500 mb-6 relative z-10 font-medium">
          Topic: {quiz.topicName}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-auto relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen size={16} className="text-blue-500" />
            <span>{quiz._count?.questions || 0} Questions</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} className="text-orange-500" />
            <span>{quiz.estimatedTime} Mins</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50 group-hover:bg-blue-50 transition-colors">
        <Link 
          href={`/artslab/quiz/${quiz.id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-sm transition-all duration-300 transform group-hover:shadow-md"
        >
          Start Quiz
        </Link>
      </div>
    </motion.div>
  );
}
