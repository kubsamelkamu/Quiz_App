import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
  Filler, 
} from 'chart.js';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/context/Authcontext';



ChartJS.register(LineElement, LinearScale, CategoryScale, PointElement, Tooltip, Legend, Filler);

interface QuizRecord {
  dateTaken: Date;
  score: number;
  category: string;
  difficulty: string;
}

const ProgressChart = () => {
  const { currentUser } = useAuth();
  const [quizHistory, setQuizHistory] = useState<QuizRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      if (!currentUser) return;

      try {
        const quizzesRef = collection(db, 'users', currentUser.uid, 'quizzes');
        const q = query(quizzesRef, orderBy('dateTaken'));
        const querySnapshot = await getDocs(q);

        const historyData: QuizRecord[] = querySnapshot.docs.map(doc => ({
          dateTaken: doc.data().dateTaken.toDate(),
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

  if (loading) return <div>Loading progress...</div>;

  // Prepare data for the chart
  const chartData = {
    labels: quizHistory.map((record) => record.dateTaken.toLocaleDateString()),
    datasets: [
      {
        label: 'Quiz Score',
        data: quizHistory.map((record) => record.score),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Progress Over Time</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ProgressChart;
