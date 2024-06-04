'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface CardProps {
  image: string;
  title: string;
  href: string;
}

export default function Card({ image, title, href }: CardProps) {
  const router = useRouter();

  return (
    <div
      className='flex h-[400px] w-[340px] flex-col items-center rounded-lg border-2 border-gray-200 bg-white p-[36px]'
      onClick={() => router.push(href)}>
      <img
        src={image}
        alt={title}
        className='w-full'
      />
      <div className='font-Roboto mt-[36px] h-[60px] text-[40px] font-bold'>{title}</div>
    </div>
  );
}
