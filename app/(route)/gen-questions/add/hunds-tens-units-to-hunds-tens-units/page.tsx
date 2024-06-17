'use client';

import { SetStateAction, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as questionApi from '@/app/_api/questionApi';
import useFetchQuestions from '@/app/_hooks/useFetchQuestions';
import generatePDF from 'react-to-pdf';
import StudyPaper from '@/app/_components/StudyPaper';
import { QuestionJSON } from '@/app/_types/question';
import Pagination from 'react-js-pagination';
import '@/app/_components/Paging.css';

export default function Page() {
  const searchParams = useSearchParams();
  const numberOfQuestions = searchParams.get('questions');
  const carry = searchParams.get('carry');
  const pages = searchParams.get('pages');

  // api에서 question 데이터 가져오기
  const fetchFunction = (params: { numberOfQuestions: number; carry: number }) =>
    questionApi.getHundsTensUnitsToHundsTensUnits(params);

  const { state, error, loading } = useFetchQuestions(
    fetchFunction,
    { numberOfQuestions: numberOfQuestions, carry: carry },
    Number(pages),
  );

  const router = useRouter();

  const [selectedValues, setSelectedValues] = useState({
    drop1: 0,
    drop2: 0,
    drop3: 0,
  });

  const pdfRef = useRef<HTMLDivElement>(null);
  const [answer, setAnswer] = useState(false);

  const handleSelectChange = (name: string, value: number) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleAnswer = () => {
    setAnswer((prevAnswer) => !prevAnswer);
  };

  const [page, setPage] = useState(1);

  const handlePageChange = (page: SetStateAction<number>) => {
    setPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='p-[36px]'>
      <div className='flex h-[60px] justify-between'>
        <button
          className='w-[60px] rounded-[50px] bg-white'
          onClick={() => router.back()}>
          <img
            src='/imgs/arrow-back.svg'
            alt='b'
            className='w-full'
          />
        </button>
        <select
          className='w-[300px] border border-gray-300 focus:outline-none'
          value={selectedValues.drop1}
          onChange={(e) => handleSelectChange('drop1', parseInt(e.target.value))}>
          <option value={0}>받아올림 없음</option>
          <option value={1}>받아올림 있음</option>
        </select>

        <select
          className='w-[300px] border border-gray-300 focus:outline-none'
          value={selectedValues.drop2}
          onChange={(e) => handleSelectChange('drop2', parseInt(e.target.value))}>
          <option value={8}>8문제</option>
          <option value={12}>12문제</option>
          <option value={16}>16문제</option>
        </select>

        <select
          className='w-[300px] border border-gray-300 focus:outline-none'
          value={selectedValues.drop3}
          onChange={(e) => handleSelectChange('drop3', parseInt(e.target.value))}>
          <option value={1}>1장</option>
          <option value={2}>2장</option>
          <option value={4}>4장</option>
          <option value={6}>6장</option>
          <option value={10}>10장</option>
          <option value={20}>20장</option>
        </select>
        <button className='w-[200px] rounded-[50px] bg-white text-2xl shadow-xl'>문제생성</button>
        <button
          className='w-[200px] rounded-[50px] bg-white text-2xl text-black shadow-xl'
          onClick={toggleAnswer}>
          {answer ? '문제보기' : '답지보기'}
        </button>
        <button
          className='w-[200px] rounded-[50px] bg-black text-2xl text-white shadow-xl'
          onClick={() =>
            generatePDF(pdfRef, {
              filename: `연산군-학습지-${state.questionJSONArray[0].questions_title}.pdf`,
            })
          }>
          다운로드
        </button>
      </div>

      {/* 학습지 paper */}
      <div
        ref={pdfRef}
        className='inset-0 mt-[36px]'>
        {state.questionJSONArray.map((items: QuestionJSON, index: number) => (
          <div
            key={items.questions_id}
            style={{ display: index + 1 === page ? 'block' : 'none' }}>
            <StudyPaper
              key={items.questions_id}
              {...items}
              answer={answer}
              page={index + 1}
            />
          </div>
        ))}
      </div>
      <div className='mb-[50px] mt-[36px]'>
        <Pagination
          activePage={page} // 현재 페이지
          itemsCountPerPage={1} // 한 페이지당 보여줄 아이템 갯수
          totalItemsCount={state.questionJSONArray.length} // 총 아이템 갯수
          pageRangeDisplayed={
            state.questionJSONArray.length > 10 ? 10 : state.questionJSONArray.length
          } // paginator의 페이지 범위
          onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        />
      </div>
    </div>
  );
}
