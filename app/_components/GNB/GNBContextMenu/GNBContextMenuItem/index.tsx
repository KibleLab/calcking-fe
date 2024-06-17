import './styles.css';
import { Item, ItemParams } from 'react-contexify';

interface Props {
  children?: React.ReactNode;
  isDisabled?: boolean;
  onClick?: ((args: ItemParams) => void) | undefined;
}

export default function GNBContextMenuItem(props: Props) {
  const { onClick, isDisabled, children } = props;

  return (
    <>
      <Item
        onClick={onClick}
        disabled={isDisabled}>
        {children}
      </Item>
    </>
  );
}
