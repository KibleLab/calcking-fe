import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '연산군',
  description: "Let's Study With 연산군!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className='inline-flex w-[1920px] flex-col'>{children}</body>
    </html>
  );
}
