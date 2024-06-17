import './styles.css';
import 'react-contexify/dist/ReactContexify.css';

import { Menu } from 'react-contexify';

interface Props {
  children?: React.ReactNode;
}

export default function GNBContextMenu(props: Props) {
  const { children } = props;

  return (
    <>
      <Menu id='gnb-context-menu'>{children}</Menu>
    </>
  );
}
