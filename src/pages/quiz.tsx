import { useEffect, useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import QuizSummary from '@/components/Quiz/QuizSummary';
import { useAuth } from '@/context/Authcontext';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizPage = () => {
  const { currentUser } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('quizQuestions');
    if (storedQuestions) {
      const parsedQuestions = JSON.parse(storedQuestions);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedQuestions = parsedQuestions.map((q: any) => ({
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: Object.values(q.answers).filter((answer) => answer !== null && answer !== q.correct_answer),
      }));
      setQuestions(mappedQuestions);
    } else {
      console.error('No quiz questions found in localStorage');
    }
    setLoading(false);
  }, []);

  const handleAnswerSelection = (answer: string) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      saveQuizResult();
      setShowSummary(true);
    }
  };

  const handleRetry = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowSummary(false);
  };

  const saveQuizResult = async () => {
    if (!currentUser) return;

    const quizRecord = {
      userId: currentUser.uid,
      dateTaken: Timestamp.now(),
      score,
      category: new URLSearchParams(window.location.search).get("category") || "General",
      difficulty: new URLSearchParams(window.location.search).get("difficulty") || "easy",
    };

    try {
      await addDoc(collection(db, 'users', currentUser.uid, 'quizzes'), quizRecord);
      console.log('Quiz record saved successfully!');
    } catch (error) {
      console.error('Error saving quiz record:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (showSummary) {
    return <QuizSummary score={score} totalQuestions={questions.length} onRetry={handleRetry} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-bold my-4">Quiz</h1>

      <h3 className="text-center text-lg font-medium mb-4">
        {questions[currentQuestionIndex].question}
      </h3>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-xl w-full mb-8">
        {[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer].map((answer, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswerSelection(answer)}
            className="bg-gray-100 hover:bg-blue-500 text-gray-800 hover:text-white rounded-lg py-2 px-4 transition-colors duration-150"
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="flex justify-between w-full max-w-sm">
        <button onClick={handleRetry} disabled={currentQuestionIndex === 0} className="bg-gray-500 text-white py-2 px-4 rounded-md">Retry</button>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1} className="bg-indigo-600 text-white py-2 px-4 rounded-md">Next</button>
      </div>
    </div>
  );
};

export default QuizPage;
