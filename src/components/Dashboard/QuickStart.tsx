import { useRouter } from 'next/router';
import { useState } from 'react';

const QuickStart = () => {
  const router = useRouter();
  const [category, setCategory] = useState('Linux');
  const [difficulty, setDifficulty] = useState('easy');

  const handleStartQuiz = () => {
    router.push({
      pathname: '/quiz',
      query: { category, difficulty },
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Quick Start a New Quiz</h2>

      <label className="block text-gray-700 mb-2">Select Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      >
        <option value="Linux">Linux</option>
        <option value="DevOps">DevOps</option>
        <option value="Docker">Docker</option>
      </select>

      <label className="block text-gray-700 mb-2">Select Difficulty</label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button
        onClick={handleStartQuiz}
        className="w-full bg-indigo-600 text-white py-2 rounded-md"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuickStart;