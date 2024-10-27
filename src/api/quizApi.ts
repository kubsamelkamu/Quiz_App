import axios from 'axios';

const API_KEY =  process.env.NEXT_PUBLIC_QUIZ_API_KEY;

export const fetchQuizQuestions = async (category: string, difficulty: string) => {
  try {
    const response = await axios.get('https://quizapi.io/api/v1/questions', {
      params: {
        apiKey: API_KEY,
        category,
        difficulty,
        limit: 10,  
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw new Error('Failed to fetch quiz questions.');
  }
};
