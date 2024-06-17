import type { Metadata } from 'next';
import './globals.css';
import GNB from './_components/GNB';

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
        <GNB isSignIn={true} />
        <div className='pt-[var(--gnb-root-height)]'>{children}</div>
      </body>
    </html>
  );
}
