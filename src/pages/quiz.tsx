import { useEffect, useState } from 'react';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('quizQuestions');
    if (storedQuestions) {
      const parsedQuestions = JSON.parse(storedQuestions);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedQuestions = parsedQuestions.map((q: any) => ({
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: Object.values(q.answers).filter(
          (answer) => answer && answer !== q.correct_answer
        ),
      }));

      setQuestions(mappedQuestions);
    } else {
      console.error('No quiz questions found in localStorage');
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Quiz</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <h3>{question.question}</h3>
          <div>
            {[...question.incorrect_answers, question.correct_answer].map((answer, idx) => (
              <div key={idx}>
                <input type="radio" id={`answer-${idx}`} name={`question-${index}`} value={answer} />
                <label htmlFor={`answer-${idx}`}>{answer}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizPage;
