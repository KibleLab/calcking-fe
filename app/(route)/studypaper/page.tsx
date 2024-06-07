import Card from '../../_components/Card';
import { Key } from 'react';

const studyTopics = [
  { image: './imgs/calcMan1.png', title: '덧셈', href: '/studypaper/addition' },
  { image: './imgs/calcGirl1.png', title: '뺄셈', href: '/studypaper' },
  { image: './imgs/calcMan2.png', title: '곱셈', href: '/studypaper' },
  { image: './imgs/calcGirl2.png', title: '나눗셈', href: '/studypaper' },
  { image: './imgs/calcMan3.png', title: '분수', href: '/studypaper' },
  { image: './imgs/calcGirl3.png', title: '소수', href: '/studypaper' },
  { image: './imgs/calcMan4.png', title: '자연수', href: '/studypaper' },
  { image: './imgs/calcGirl4.png', title: '분수와 소수', href: '/studypaper' },
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
        <div className='border-gray font-dongle mb-[80px] border-b-2 text-[96px]'>학습지</div>
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
