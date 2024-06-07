import type { Metadata } from 'next';
import './globals.css';
import NavBar from './_components/NavBar';

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
      <body className='inline-flex w-[1920px] flex-col bg-gray-100'>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
