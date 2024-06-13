import { useState, useEffect } from 'react';

interface QuestionArray {
  question_number: number;
  first_number: number;
  last_number: number;
  answer: number;
  operator: string;
}

interface QuestionJSON {
  questions_id: string;
  questions_title: string;
  questions_level: string;
  questions: QuestionArray[];
}

interface QuestionJSONArray {
  questionJSONArray: QuestionJSON[];
}

interface QuestionParams {
  numberOfQuestions: number;
  carry: number;
}

type FetchFunction = (params: QuestionParams) => Promise<{ data: QuestionJSON }>;

const useFetchQuestions = (
  fetchFunction: FetchFunction,
  initialParams: QuestionParams,
  page: number,
) => {
  const [state, setState] = useState<QuestionJSONArray>({
    questionJSONArray: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (params: QuestionParams) => {
    try {
      const questionApiDataList = [];
      for (let i = 0; i < page; i++) {
        const response = await fetchFunction(params);
        questionApiDataList.push(response.data);
      }
      setState({ questionJSONArray: questionApiDataList });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(initialParams);
  }, []);

  return { state, error, loading };
};

export default useFetchQuestions;
