import { QRCodeCanvas } from 'qrcode.react';
import { QuestionJSON } from '@/app/_types/question';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionCell from './QuestionCell';

export default function StudyPaper(props: QuestionJSON & { answer: boolean; page: number }) {
  const router = useRouter();
  const [rootPath, setRootPath] = useState('');

  const timeToString = () => {
    const date = new Date(new Date());
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    setRootPath(window.location.origin);
  }, []);

  return (
    <>
      {/* 출력 영역 */}
      <div
        className=' bg-white p-[80px] shadow-xl'
        style={{ height: 'calc(1848px * 1.413)' }}>
        {/* Title 영역 */}
        <div className='flex h-[10%] items-center justify-between border-b-4 border-black p-[36px]'>
          <img
            className='h-full'
            src='/imgs/logo.svg'
            alt='Logo'
          />
          <div className='w-full text-center text-6xl font-bold'>
            {props.questions_title} - [{props.questions_level}]
          </div>
          <div>
            <QRCodeCanvas
              value={`${rootPath}/gen-answers/add?questionsID=${props.questions_id}`}
              onClick={() => router.push(`/gen-answers/add?questionsID=${props.questions_id}`)}
            />
          </div>
        </div>

        {/* questions 영역 */}
        <div className={`grid h-[85%] grid-cols-4 gap-12 p-[80px]`}>
          {props.questions.map((item) => (
            <div
              className='text-4xl '
              key={item.question_number}>
              {/* 첫 번째 숫자의 자릿수를 확인하여 조건부 렌더링 */}
              {item.first_number.toString().length > 1 ? (
                <QuestionCell
                  firstnumber={String(item.first_number)}
                  operator={item.operator}
                  lastnumber={String(item.last_number)}
                  answer={props.answer ? String(item.answer) : ''}
                />
              ) : (
                <>
                  {String.fromCharCode(0x2460 + item.question_number - 1) + ' '}
                  {item.first_number + ' '}
                  {item.operator + ' '}
                  {item.last_number + ' ='}
                  {props.answer && ' ' + item.answer}
                </>
              )}
            </div>
          ))}
        </div>

        {/* bottom 영역 */}
        <div className='flex h-[5%] items-center justify-between p-[20px] text-center'>
          <div className='w-1/3 text-blue-500'>
            ※ 답지는 문제지 발행일 기준 90일 까지 확인 가능합니다.
          </div>
          <div className='w-1/3 text-4xl'>-{props.page}-</div>
          <div className='w-1/3'>
            발행일: {timeToString()} 학습지 코드: {props.questions_id}
          </div>
        </div>
      </div>
      {/* 출력 영역 */}
    </>
  );
}
