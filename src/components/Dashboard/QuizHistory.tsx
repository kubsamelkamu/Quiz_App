import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/context/Authcontext';

interface QuizRecord {
  id: string;
  dateTaken: string;
  score: number;
  category: string;
  difficulty: string;
}

const QuizHistory = () => {
  const { currentUser } = useAuth();
  const [quizHistory, setQuizHistory] = useState<QuizRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      if (!currentUser) return;

      try {
        const quizzesRef = collection(db, 'users', currentUser.uid, 'quizzes');
        const q = query(quizzesRef);
        const querySnapshot = await getDocs(q);
        const historyData: QuizRecord[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          dateTaken: doc.data().dateTaken.toDate().toLocaleDateString(), 
          score: doc.data().score,
          category: doc.data().category,
          difficulty: doc.data().difficulty,
        }));
        setQuizHistory(historyData);
      } catch (error) {
        console.error('Error fetching quiz history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizHistory();
  }, [currentUser]);

  if (loading) return <div>Loading quiz history...</div>;


return (
  <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-8">
    <h2 className="text-2xl font-bold mb-4 text-center">Quiz History</h2>
    {quizHistory.length === 0 ? (
      <p className="text-center text-gray-600">No quiz history available.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="border-b p-4 font-semibold">Date Taken</th>
              <th className="border-b p-4 font-semibold">Score</th>
              <th className="border-b p-4 font-semibold">Category</th>
              <th className="border-b p-4 font-semibold">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {quizHistory.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-gray-100">
                <td className="border-b p-4">{quiz.dateTaken}</td>
                <td className="border-b p-4">{quiz.score}</td>
                <td className="border-b p-4">{quiz.category}</td>
                <td className="border-b p-4 capitalize">{quiz.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

};

export default QuizHistory;
