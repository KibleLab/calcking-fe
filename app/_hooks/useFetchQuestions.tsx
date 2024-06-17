import { useState, useEffect } from 'react';
import { QuestionJSON, QuestionJSONArray } from '@/app/_types/question';

type FetchFunction = (params: any) => Promise<{ data: QuestionJSON }>;

const useFetchQuestions = (fetchFunction: FetchFunction, initialParams: any, page: number = 1) => {
  const [state, setState] = useState<QuestionJSONArray>({
    questionJSONArray: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (params: any) => {
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
