import Card from '../../_components/Card';
import { Key } from 'react';

const studyTopics = [
  { image: './imgs/calcMan1.svg', title: '덧셈', href: '/gen-questions/add' },
  { image: './imgs/calcGirl1.svg', title: '뺄셈', href: '/gen-questions' },
  { image: './imgs/calcMan2.svg', title: '곱셈', href: '/gen-questions' },
  { image: './imgs/calcGirl2.svg', title: '나눗셈', href: '/gen-questions' },
  { image: './imgs/calcMan3.svg', title: '분수', href: '/gen-questions' },
  { image: './imgs/calcGirl3.svg', title: '소수', href: '/gen-questions' },
  { image: './imgs/calcMan4.svg', title: '자연수', href: '/gen-questions' },
  { image: './imgs/calcGirl4.svg', title: '분수와 소수', href: '/gen-questions' },
];

interface TopicProps {
  image: string;
  title: string;
  href: string;
}

export default function Page() {
  return (
    <div className='p-[80px]'>
      <div className='w-[1760px] bg-white p-[80px]'>
        <div className='border-gray mb-[80px] border-b-2 font-dongle text-[96px]'>학습지</div>
        <div className='grid grid-cols-2 gap-[80px] md:grid-cols-4'>
          {studyTopics.map((topic: TopicProps, index: Key) => (
            <Card
              key={index}
              image={topic.image}
              title={topic.title}
              href={topic.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
