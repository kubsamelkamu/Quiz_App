import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import QuizSummary from '@/components/Quiz/QuizSummary';
import axios from 'axios';
import { useAuth } from '@/context/Authcontext';


interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const category = router.query.category || 'General';
  const difficulty = router.query.difficulty || 'easy';

  useEffect(() => {
    
    const fetchQuestions = async () => {
      router.push('/login');
      try {
        const response = await axios.get('https://opentdb.com/api.php', {
          params: {
            amount: 10,
            category,
            difficulty,
            type: 'multiple',
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedQuestions = response.data.results.map((q: any) => ({
          question: q.question,
          correct_answer: q.correct_answer,
          incorrect_answers: q.incorrect_answers,
        }));

        setQuestions(mappedQuestions);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, currentUser, difficulty, router]);

  const shuffleArray = (array: string[]) => array.sort(() => Math.random() - 0.5);

  const handleAnswerSelection = (answer: string) => {
    if (answer === questions[currentQuestionIndex]?.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
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
      category,
      difficulty,
    };

    try {
      await addDoc(collection(db, 'users', currentUser.uid, 'quizzes'), quizRecord);
      console.log('Quiz record saved successfully!');
    } catch (error) {
      console.error('Error saving quiz record:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return <div>No questions available.</div>;

  const answers = shuffleArray([...currentQuestion.incorrect_answers, currentQuestion.correct_answer]);

  if (showSummary) {
    return <QuizSummary score={score} totalQuestions={questions.length} onRetry={handleRetry} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-bold my-4">Quiz</h1>

      <h3 className="text-center text-lg font-medium mb-4">
        {currentQuestion.question}
      </h3>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-xl w-full mb-8">
        {answers.map((answer, idx) => (
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
        <button onClick={handleRetry} disabled={currentQuestionIndex === 0} className="bg-gray-500 text-white py-2 px-4 rounded-md">
          Retry
        </button>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1} className="bg-indigo-600 text-white py-2 px-4 rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
