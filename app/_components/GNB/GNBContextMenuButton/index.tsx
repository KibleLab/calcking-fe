import './styles.css';

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function GNBContextMenuButton(props: Props) {
  const { onClick } = props;
  return (
    <div
      className='gnb-context-menu-button-root'
      onClick={onClick}>
      <img
        src='/imgs/menu-icon.svg'
        alt='Context Menu'
      />
    </div>
  );
}
