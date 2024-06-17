'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/app/_components/Modal';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달로 넘겨야할 정보
  const [option, setOption] = useState({
    title: '',
    level: '',
    link: '',
    drop1: 0,
    drop2: 8,
    drop3: 1,
  });

  // 다음 문제생성 페이지에 넘겨야할 정보
  const handleOptionChange = (name: string, value: number) => {
    setOption((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openModal = (item: { title: string; level: string; link: string }) => {
    setIsModalOpen(true);
    setOption((prevState) => ({
      ...prevState,
      title: item.title,
      level: item.level,
      link: item.link,
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const questionTitle = [
    { title: '몇 + 몇', level: 'A-1', link: 'units-to-units' },
    { title: '몇 + 몇 + 몇', level: 'A-1', link: 'units-to-units-to-units' },
    { title: '몇십 + 몇', level: 'A-2', link: 'tens-to-units' },
    { title: '몇십몇 + 몇', level: 'A-2', link: 'tens-units-to-units' },
    { title: '몇십몇 + 몇십몇', level: 'A-2', link: 'tens-units-to-tens-units' },
    { title: '몇백 + 몆', level: 'A-2', link: 'hunds-to-units' },
    { title: '몇백 + 몇십몇', level: 'A-2', link: 'hunds-to-tens-units' },
    { title: '몇백몇십+ 몇', level: 'A-2', link: 'hunds-tens-to-units' },
    { title: '몇백몇십 + 몇십몇', level: 'A-2', link: 'hunds-tens-to-tens-units' },
    { title: '몇백몇십몇 + 몇', level: 'A-2', link: 'hunds-tens-units-to-units' },
    { title: '몇백몇십몇 + 몇십몇', level: 'A-2', link: 'hunds-tens-units-to-tens-units' },
    {
      title: '몇백몇십몇 + 몇백몇십몇',
      level: 'A-2',
      link: 'hunds-tens-units-to-hunds-tens-units',
    },
  ];

  return (
    <main className='p-[36px]'>
      <div className='flex bg-white p-[80px] shadow-md'>
        <div className='w-1/4'>
          <img
            src='/imgs/logo.svg'
            alt='Logo'
            className='w-full'
          />
        </div>

        <div className='w-full space-y-4'>
          <div className='border-gray border-b-2 font-dongle text-6xl'>덧셈</div>
          {questionTitle.map((items, index) => (
            <button
              key={index}
              className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'
              onClick={() => {
                openModal(items);
              }}>
              {items.title}
              <p className='text-lx text-gray-500'>{items.level}</p>
            </button>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}>
        <div className='flex h-[60px] w-full items-center justify-center text-2xl'>
          {option.title}[{option.level}]
        </div>
        <select
          className='mt-[36px] h-[60px] w-full border border-gray-300 focus:outline-none'
          value={option.drop1}
          onChange={(e) => handleOptionChange('drop1', parseInt(e.target.value))}>
          <option value={0}>받아올림 없음</option>
          <option value={1}>받아올림 1회</option>
          <option value={2}>받아올림 2회</option>
          <option value={3}>받아올림 3회</option>
        </select>

        <select
          className='mt-[36px] h-[60px] w-full border border-gray-300 focus:outline-none'
          value={option.drop2}
          onChange={(e) => handleOptionChange('drop2', parseInt(e.target.value))}>
          <option value={8}>8문제</option>
          <option value={12}>12문제</option>
          <option value={16}>16문제</option>
        </select>

        <select
          className='mt-[36px] h-[60px] w-full border border-gray-300 focus:outline-none'
          value={option.drop3}
          onChange={(e) => handleOptionChange('drop3', parseInt(e.target.value))}>
          <option value={1}>1장</option>
          <option value={2}>2장</option>
          <option value={4}>4장</option>
          <option value={6}>6장</option>
          <option value={10}>10장</option>
          <option value={20}>20장</option>
        </select>

        <button
          className='mt-[36px] h-[60px] w-full rounded-[50px] bg-black text-2xl text-white'
          onClick={() =>
            router.push(
              `${pathname}/${option.link}?carry=${option.drop1}&questions=${option.drop2}&pages=${option.drop3}`,
            )
          }>
          문제지 만들기
        </button>
      </Modal>
    </main>
  );
}
