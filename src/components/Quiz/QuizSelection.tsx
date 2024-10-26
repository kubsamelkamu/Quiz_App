import { useState } from 'react';
import { useRouter } from 'next/router';
import { fetchQuizQuestions } from '@/api/quizApi';

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
        console.log('Fetched Questions:', questions);  
        router.push({
          pathname: '/quiz',
          query: { questions: JSON.stringify(questions) }, 
        });
      } catch (error) {
        console.error('Error fetching quiz:', error);
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
          <button
            onClick={() => setCategory('Linux')}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              category === 'Linux' ? 'bg-blue-500' : 'bg-blue-300 hover:bg-blue-400'
            }`}
          >
            Linux
          </button>
          <button
            onClick={() => setCategory('DevOps')}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              category === 'DevOps' ? 'bg-green-500' : 'bg-green-300 hover:bg-green-400'
            }`}
          >
            DevOps
          </button>
          <button
            onClick={() => setCategory('Docker')}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              category === 'Docker' ? 'bg-indigo-500' : 'bg-indigo-300 hover:bg-indigo-400'
            }`}
          >
            Docker
          </button>
          <button
            onClick={() => setCategory('Kubernetes')}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              category === 'Kubernetes' ? 'bg-teal-500' : 'bg-teal-300 hover:bg-teal-400'
            }`}
          >
            Kubernetes
          </button>
          <button
            onClick={() => setCategory('AWS')}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              category === 'AWS' ? 'bg-yellow-500' : 'bg-yellow-300 hover:bg-yellow-400'
            }`}
          >
            AWS
          </button>
          <button
            onClick={() => setCategory('JavaScript')}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              category === 'JavaScript' ? 'bg-purple-500' : 'bg-purple-300 hover:bg-purple-400'
            }`}
          >
            JavaScript
          </button>
          <button
            onClick={() => setCategory('Python')}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              category === 'Python' ? 'bg-pink-500' : 'bg-pink-300 hover:bg-pink-400'
            }`}
          >
            Python
          </button>
          <button
            onClick={() => setCategory('Networking')}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              category === 'Networking' ? 'bg-red-500' : 'bg-red-300 hover:bg-red-400'
            }`}
          >
            Networking
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Difficulty</h2>
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setDifficulty('easy')}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              difficulty === 'easy' ? 'bg-yellow-500' : 'bg-yellow-300 hover:bg-yellow-400'
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => setDifficulty('medium')}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              difficulty === 'medium' ? 'bg-purple-500' : 'bg-purple-300 hover:bg-purple-400'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setDifficulty('hard')}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              difficulty === 'hard' ? 'bg-red-500' : 'bg-red-300 hover:bg-red-400'
            }`}
          >
            Hard
          </button>
        </div>

        <button
          onClick={handleFetchQuestions}
          disabled={!category || !difficulty || loading}
          className={`w-full py-3 rounded-md text-white font-bold transition duration-200 ${
            category && difficulty
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {loading ? 'Loading...' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
};


export default QuizSelection;
