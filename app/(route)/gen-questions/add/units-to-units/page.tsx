'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as questionApi from '@/app/_api/questionApi';
import useFetchQuestions from '@/app/_hooks/useFetchQuestions';
import generatePDF from 'react-to-pdf';
import { QRCodeCanvas } from 'qrcode.react';

export default function Page() {
  // api에서 question 데이터 가져오기
  const fetchFunction = (params: { numberOfQuestions: number; carry: number }) =>
    questionApi.getUnitsToUnits(params);

  const { state, error, loading } = useFetchQuestions(
    fetchFunction,
    { numberOfQuestions: 16, carry: 0 },
    1,
  );

  const router = useRouter();
  const [rootPath, setRootPath] = useState('');

  useEffect(() => {
    setRootPath(window.location.origin);
  }, []);

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

  const timeToString = () => {
    const date = new Date(new Date());
    return date.toISOString().split('T')[0];
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
          className='w-[600px] border border-gray-300 focus:outline-none'
          value={selectedValues.drop1}
          onChange={(e) => handleSelectChange('drop1', parseInt(e.target.value))}>
          <option value={0}>몇 + 몇 (받아올림 없음)</option>
          <option value={1}>몇 + 몇 (받아올림 있음)</option>
        </select>

        <select
          className='w-[300px] border border-gray-300 focus:outline-none'
          value={selectedValues.drop2}
          onChange={(e) => handleSelectChange('drop2', parseInt(e.target.value))}>
          <option value={8}>8문제</option>
          <option value={12}>12문제</option>
          <option value={16}>16문제</option>
          <option value={20}>20문제</option>
        </select>

        <select
          className='w-[300px] border border-gray-300 focus:outline-none'
          value={selectedValues.drop3}
          onChange={(e) => handleSelectChange('drop3', parseInt(e.target.value))}>
          <option value={1}>1장</option>
          <option value={2}>2장</option>
          <option value={5}>5장</option>
          <option value={10}>10장</option>
          <option value={15}>15장</option>
          <option value={20}>20장</option>
        </select>
        <button
          className='w-[200px] rounded-[50px] bg-white text-2xl text-black shadow-xl'
          onClick={toggleAnswer}>
          {answer ? '문제보기' : '답지보기'}
        </button>
        <button
          className='w-[200px] rounded-[50px] bg-black text-2xl text-white shadow-xl'
          onClick={() => generatePDF(pdfRef, { filename: 'page.pdf' })}>
          출력하기
        </button>
      </div>
      {/* 출력 영역 */}
      <div
        ref={pdfRef}
        className='inset-0 mt-[36px] bg-white p-[80px] shadow-xl'
        style={{ height: 'calc(1848px * 1.413)' }}>
        {/* Title 영역 */}
        <div className='flex h-[10%] items-center justify-between border-b-4 border-black p-[36px]'>
          <img
            className='h-full'
            src='/imgs/logo.svg'
            alt='Logo'
          />
          <div className='w-full text-center text-6xl font-bold'>
            {state.questionJSONArray[0].questions_title} - [
            {state.questionJSONArray[0].questions_level}]
          </div>
          <div>
            <QRCodeCanvas
              value={`${rootPath}/gen-questions/answer?code=${state.questionJSONArray[0].questions_id}`}
              onClick={() =>
                router.push(`/gen-questions/answer?code=${state.questionJSONArray[0].questions_id}`)
              }
            />
          </div>
        </div>

        {/* questions 영역 */}
        {state.questionJSONArray[0].questions.length > 0 && (
          <div className='grid h-[85%] grid-cols-4 gap-12 p-[80px]'>
            {state.questionJSONArray[0].questions.map((item) => (
              <div
                className='flex text-4xl'
                key={item.question_number}>
                {item.first_number + ' '}
                {item.operator + ' '}
                {item.last_number + ' ='}
                {answer && ' ' + item.answer}
              </div>
            ))}
          </div>
        )}

        {/* bottom 영역 */}
        <div className='flex h-[5%] items-center justify-between p-[20px] text-center'>
          <div className='w-1/3 text-blue-500'>
            ※ 답지는 문제지 발행일 기준 90일 까지 확인 가능합니다.
          </div>
          <div className='w-1/3 text-4xl'>-1-</div>
          <div className='w-1/3'>
            발행일: {timeToString()} 학습지 코드: {state.questionJSONArray[0].questions_id}
          </div>
        </div>
      </div>
    </div>
  );
}
