import React from 'react';

interface QuestionCellProps {
  firstnumber: string;
  lastnumber: string;
  answer: string;
  operator: string;
}

export default function QuestionCell({
  firstnumber,
  lastnumber,
  answer,
  operator,
}: QuestionCellProps) {
  const firstRow = ['', ...firstnumber.split('').map(Number)];
  const secondRow = [
    operator,
    ...Array(firstnumber.length - lastnumber.length).fill(''),
    ...lastnumber.split('').map(Number),
  ];
  const answerArray = [
    ...Array(firstRow.length - answer.length).fill(''),
    ...answer.split('').map(Number),
  ];

  const data = [firstRow, secondRow, answerArray];

  return (
    <div>
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className='flex'>
          {row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`flex h-[60px] w-[60px] items-center justify-center border border-gray-300 
                ${rowIndex === 2 ? 'text-blue-500' : ''}`}>
              {cell !== null ? cell : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
