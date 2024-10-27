import { useEffect, useState } from 'react';
import styles from '@/styles/quiz.module.css';
import QuizSummary from '@/components/Quiz/QuizSummary';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [timer, setTimer] = useState(30);

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

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) return prevTimer - 1;
        else {
          handleNext(); 
          return 10; 
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  const handleAnswerSelection = (answer: string) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(10);
    } else {
      setShowSummary(true); 
    }
  };

  const handleRetry = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowSummary(false);
    setTimer(30);
  };

  if (loading) return <div>Loading...</div>;

  if (showSummary) {
    return <QuizSummary score={score} totalQuestions={questions.length} onRetry={handleRetry} />;
  }

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className={`${styles['quiz-background']} flex flex-col items-center justify-center`}>
      <h1 className="text-center text-2xl font-bold my-4 text-white">Quiz</h1>
      <div className="bg-gray-200 w-full h-4 rounded-full my-4">
        <div className="bg-indigo-600 h-4 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className="text-center text-white text-xl mb-4">
        Time Remaining: {timer} seconds
      </div>
      <div>
        <h3 className="text-white">{questions[currentQuestionIndex].question}</h3>
        <div>
          {[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer].map((answer, idx) => (
            <div key={idx}>
              <input
                type="radio"
                id={`answer-${idx}`}
                name="answer"
                value={answer || ""}
                onClick={() => handleAnswerSelection(answer)}
              />
              <label htmlFor={`answer-${idx}`} className="text-white">{answer || ""}</label>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={handleRetry} disabled={currentQuestionIndex === 0} className="bg-gray-500 text-white px-4 py-2 rounded-md">Previous</button>
          <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1} className="bg-indigo-600 text-white px-4 py-2 rounded-md">Next</button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
