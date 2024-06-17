'use client';
import './styles.css';
import { useRouter } from 'next/navigation';
import { Separator, useContextMenu } from 'react-contexify';
import GNBHomeButton from './GNBHomeButton';
import GNBContextMenuButton from './GNBContextMenuButton';
import GNBContextMenu from './GNBContextMenu';
import GNBContextMenuItem from './GNBContextMenu/GNBContextMenuItem';



interface Props {
  isSignIn: boolean;
}

export default function GNB(props: Props) {
  const router = useRouter();
  const { isSignIn } = props;
  const { show } = useContextMenu({ id: 'gnb-context-menu' });

  const handleClick = (event: React.MouseEvent) => {
    const innerWidth = window.innerWidth;
    const contextMenuX = innerWidth - 300 - 10;
    const contextMenuY = 110;
    show({ event, position: { x: contextMenuX, y: contextMenuY } });
  };

  return (
    <div className='gnb-root'>
      <GNBHomeButton />
      <GNBContextMenuButton onClick={handleClick} />

      <GNBContextMenu>
        {isSignIn ? (
          <GNBContextMenuItem
            onClick={() => router.push('/profile')}
            isDisabled>
            프로필
          </GNBContextMenuItem>
        ) : (
          <GNBContextMenuItem onClick={() => router.push('/sign-in')}>로그인</GNBContextMenuItem>
        )}
        <Separator />
        <GNBContextMenuItem onClick={() => router.push('/gen-questions')}>
          학습지 만들기
        </GNBContextMenuItem>
        <Separator />
        <GNBContextMenuItem onClick={() => router.push('/gen-answers')}>
          답지 보기
        </GNBContextMenuItem>
        {isSignIn && (
          <>
            <Separator />
            <GNBContextMenuItem
              onClick={() => router.push('/score-answers')}
              isDisabled>
              AI 정답 채점
            </GNBContextMenuItem>
            <Separator />
            <GNBContextMenuItem onClick={() => router.push('/sign-out')}>
              로그아웃
            </GNBContextMenuItem>
          </>
        )}
      </GNBContextMenu>
    </div>
  );
}
