import { useEffect, useState } from 'react';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/context/Authcontext';
import router from 'next/router';


interface QuizRecord {
  dateTaken: Date;
  score: number;
  category: string;
  difficulty: string;
}

const QuizHistory = () => {
  const { currentUser } = useAuth();
  const [quizHistory, setQuizHistory] = useState<QuizRecord[]>([]);

  useEffect(() => {
    if(!currentUser){
      router.push('/login');
    }
    const fetchQuizHistory = async () => {
      if (!currentUser) return;

      const userQuizzesCollection = collection(db, 'users', currentUser.uid, 'quizzes');
      const quizSnapshot = await getDocs(userQuizzesCollection);

      const historyData = quizSnapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
          dateTaken: data.dateTaken.toDate(),
          score: data.score,
          category: data.category || 'General',
          difficulty: data.difficulty || 'easy', 
        };
      });

      setQuizHistory(historyData);
    };

    fetchQuizHistory();
  }, [currentUser]);

  if (!quizHistory.length) return <p>No quiz history available.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Quiz History</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4 font-semibold">Date</th>
            <th className="border-b p-4 font-semibold">Score</th>
            <th className="border-b p-4 font-semibold">Category</th>
            <th className="border-b p-4 font-semibold">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {quizHistory.map((record, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border-b p-4">{record.dateTaken.toLocaleDateString()}</td>
              <td className="border-b p-4">{record.score}</td>
              <td className="border-b p-4">{record.category}</td>
              <td className="border-b p-4">{record.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizHistory;
