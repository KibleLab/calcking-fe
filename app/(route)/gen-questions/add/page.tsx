'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main className='p-[80px]'>
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
          <button
            className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'
            onClick={() => router.push(`${pathname}/units-to-units`)}>
            몇 + 몇 (최대 한번 올림) <p className='text-lx text-gray-500'>A-1</p>
          </button>
          <button className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'>
            몇 + 몇 + 몇 (최대 한번 올림) <p className='text-lx text-gray-500'>A-1</p>
          </button>
          <button className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'>
            몇십 + 몇(올림 없음) <p className='text-lx text-gray-500'>A-2</p>
          </button>
          <button className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'>
            몇십몇 + 몇(최대 한번 올림)
            <p className='text-lx text-gray-500'>A-2</p>
          </button>
          <button className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'>
            몇십몇 + 몇십몇(최대 두번 올림)
            <p className='text-lx text-gray-500'>A-2</p>
          </button>
          <button className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'>
            몇백 + 몆(올림없음)
            <p className='text-lx text-gray-500'>A-2</p>
          </button>
          <button className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'>
            몇백 + 몇십몇(올림 없음)
            <p className='text-lx text-gray-500'>A-2</p>
          </button>
          <button className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'>
            몇백몇십+ 몇 (올림 없음)
            <p className='text-lx text-gray-500'>A-2</p>
          </button>
          <button className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'>
            몇백몇십 + 몇십몇 (최대 두번 올림)
            <p className='text-lx text-gray-500'>A-2</p>
          </button>
          <button className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'>
            몇백몇십몇 + 몇 (최대 한번 올림)
            <p className='text-lx text-gray-500'>A-2</p>
          </button>
          <button className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'>
            몇백몇십몇 + 몇십몇 (최대 두번 올림)
            <p className='text-lx text-gray-500'>A-2</p>
          </button>
          <button className='w-full rounded-lg bg-white p-8 text-left text-3xl shadow-lg'>
            몇백몇십몇 + 몇백몇십몇 (최대 세번 올림)
            <p className='text-lx text-gray-500'>A-2</p>
          </button>
        </div>
      </div>
    </main>
  );
}
