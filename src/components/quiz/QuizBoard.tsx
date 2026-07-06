'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface QuizBoardProps {
  quiz: any; // Quiz with Questions
}

export default function QuizBoard({ quiz }: QuizBoardProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const questions = quiz.questions;
  const currentQuestion = questions[currentIndex];
  const progressPercentage = ((currentIndex) / questions.length) * 100;

  const handleSelectOption = (optionKey: string) => {
    if (isAnswered) return;
    setSelectedOption(optionKey);
    setIsAnswered(true);

    if (optionKey === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 10); // arbitrary score value per question
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finish Quiz
      const results = {
        score,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        percentage: (correctCount / questions.length) * 100,
        quizTitle: quiz.title,
        subject: quiz.subject,
      };
      
      localStorage.setItem(`quiz_result_${quiz.id}`, JSON.stringify(results));
      router.push(`/artslab/quiz/${quiz.id}/results`);
    }
  };

  const getOptionClass = (optionKey: string) => {
    if (!isAnswered) {
      return "bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer";
    }

    if (optionKey === currentQuestion.correctAnswer) {
      return "bg-green-100 border-green-500 text-green-900 shadow-sm"; // Correct answer always green
    }

    if (optionKey === selectedOption && optionKey !== currentQuestion.correctAnswer) {
      return "bg-red-100 border-red-500 text-red-900 shadow-sm"; // Selected wrong answer is red
    }

    return "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed"; // Other options disabled
  };

  const options = [
    { key: "A", text: currentQuestion.optionA },
    { key: "B", text: currentQuestion.optionB },
    { key: "C", text: currentQuestion.optionC },
    { key: "D", text: currentQuestion.optionD },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-3xl grow flex flex-col">
        
        {/* Top Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/artslab/quiz" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition">
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
          </div>
          
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-gray-500">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <motion.div 
              className="bg-blue-600 h-2.5 rounded-full" 
              initial={{ width: `${((currentIndex)/questions.length)*100}%` }}
              animate={{ width: `${((currentIndex + 1)/questions.length)*100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grow flex flex-col"
          >
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 leading-tight">
                {currentQuestion.question}
              </h2>

              <div className="space-y-4">
                {options.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${getOptionClass(opt.key)}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white font-bold shadow-sm border border-gray-100 text-gray-600">
                        {opt.key}
                      </span>
                      <span className="text-lg">{opt.text}</span>
                    </div>
                    
                    {isAnswered && opt.key === currentQuestion.correctAnswer && (
                      <CheckCircle className="text-green-600" size={24} />
                    )}
                    {isAnswered && opt.key === selectedOption && opt.key !== currentQuestion.correctAnswer && (
                      <XCircle className="text-red-600" size={24} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Box */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`p-6 rounded-2xl shadow-md mb-6 ${
                    selectedOption === currentQuestion.correctAnswer 
                      ? "bg-green-50 border border-green-200" 
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {selectedOption === currentQuestion.correctAnswer ? (
                      <>
                        <CheckCircle className="text-green-600" size={28} />
                        <h3 className="text-xl font-bold text-green-800">Correct Answer!</h3>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-600" size={28} />
                        <h3 className="text-xl font-bold text-red-800">Incorrect</h3>
                      </>
                    )}
                  </div>
                  
                  {selectedOption !== currentQuestion.correctAnswer && (
                    <p className="text-red-900 mb-4 font-medium">
                      The correct answer is <span className="font-bold">Option {currentQuestion.correctAnswer}</span>
                    </p>
                  )}

                  {currentQuestion.explanation && (
                    <div className="mt-4 pt-4 border-t border-black/10">
                      <h4 className="font-bold mb-1 opacity-80">Explanation:</h4>
                      <p className="opacity-90">{currentQuestion.explanation}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-end pb-8">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleNext}
                  className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg"
                >
                  {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
