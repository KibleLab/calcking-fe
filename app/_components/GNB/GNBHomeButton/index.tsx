import './styles.css';
import Image from 'next/image';
import Link from 'next/link';

export default function GNBHomeButton() {
  return (
    <Link href='/'>
      <div className='gnb-home-button-root'>
        <Image
          src='/imgs/logo.svg'
          alt='Calcking'
          width={100}
          height={98}
        />
      </div>
    </Link>
  );
}
