'use client';

import { useSearchParams } from 'next/navigation';
import * as questionApi from '@/app/_api/questionApi';
import useFetchQuestions from '@/app/_hooks/useFetchQuestions';
import { QuestionJSON } from '@/app/_types/question';
import StudyPaper from '@/app/_components/StudyPaper';
import { useRouter } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // questionsID 쿼리스트링 값 가져오기
  const questionsID = searchParams.get('questionsID');

  const fetchFunction = (params: { questionsID: string }) => questionApi.getGenAnswerAdd(params);

  const { state, error, loading } = useFetchQuestions(fetchFunction, {
    questionsID: questionsID,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='p-[36px]'>
      {/* 뒤로가기 */}
      <div className='mt-[36px] flex h-[60px] justify-between'>
        <button
          className='w-[60px] rounded-[50px] bg-white'
          onClick={() => router.back()}>
          <img
            src='/imgs/arrow-back.svg'
            alt='b'
            className='w-full'
          />
        </button>
      </div>

      {/* 정답지 */}
      <div className='inset-0 mt-[36px]'>
        {state && (
          <div>
            {state.questionJSONArray.map((item: QuestionJSON) => (
              <StudyPaper
                key={item.questions_id}
                {...item}
                answer={true}
                page={1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
