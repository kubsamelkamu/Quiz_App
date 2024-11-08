import { useState } from 'react';
import { useRouter } from 'next/router';
import { fetchQuizQuestions } from '@/api/quizApi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuizSelection = () => {
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchQuestions = async () => {
    if (category && difficulty) {
      setLoading(true);
      try {
        const questions = await fetchQuizQuestions(category, difficulty);
        const shuffledQuestions = shuffleArray(questions);

        localStorage.removeItem('quizQuestions');
        localStorage.setItem('quizQuestions', JSON.stringify(shuffledQuestions));

        router.push('/quiz'); 
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        alert('Failed to load quiz. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please select both category and difficulty');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Quiz Category</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button onClick={() => setCategory('Linux')} className="bg-blue-500 px-4 py-2 rounded-md text-white">Linux</button>
          <button onClick={() => setCategory('DevOps')} className="bg-green-500 px-4 py-2 rounded-md text-white">DevOps</button>
          <button onClick={() => setCategory('Docker')} className="bg-teal-500 px-4 py-2 rounded-md text-white">Docker</button>
          <button onClick={() => setCategory('Kubernetes')} className="bg-indigo-500 px-4 py-2 rounded-md text-white">Kubernetes</button>
          <button onClick={() => setCategory('Programming')} className="bg-purple-500 px-4 py-2 rounded-md text-white">Programming</button>
          <button onClick={() => setCategory('JavaScript')} className="bg-yellow-500 px-4 py-2 rounded-md text-white">JavaScript</button>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Difficulty</h2>
        <div className="flex justify-around mb-6">
          <button onClick={() => setDifficulty('easy')} className="bg-yellow-500 px-4 py-2 rounded-md text-white">Easy</button>
          <button onClick={() => setDifficulty('medium')} className="bg-purple-500 px-4 py-2 rounded-md text-white">Medium</button>
          <button onClick={() => setDifficulty('hard')} className="bg-red-500 px-4 py-2 rounded-md text-white">Hard</button>
        </div>

        <button
          onClick={handleFetchQuestions}
          disabled={!category || !difficulty || loading} 
          className={`w-full py-3 rounded-md font-bold ${
            !category || !difficulty || loading
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Loading...' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
};

export default QuizSelection;
