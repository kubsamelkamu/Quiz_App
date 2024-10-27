import { useRouter } from 'next/router';

interface QuizSummaryProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

const QuizSummary: React.FC<QuizSummaryProps> = ({ score, totalQuestions, onRetry }) => {
  const router = useRouter();
  const scorePercentage = (score / totalQuestions) * 100;
  let feedbackMessage = '';

  if (scorePercentage >= 80) {
    feedbackMessage = 'Excellent work! You scored very high!';
  } else if (scorePercentage >= 50) {
    feedbackMessage = 'Good job! Keep practicing to improve even more.';
  } else {
    feedbackMessage = 'Don’t give up! Practice makes perfect.';
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
      <p className="text-xl mb-2">Your Score: {score} / {totalQuestions}</p>
      <p className="text-lg mb-4">{feedbackMessage}</p>

      <div className="flex space-x-4">
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Retake Quiz
        </button>
        <button
          onClick={() => router.push('/')}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default QuizSummary;
