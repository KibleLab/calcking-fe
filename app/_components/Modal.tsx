import React from 'react';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, children, closeModal }: ModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      {isOpen && (
        <>
          <div
            className='fixed left-0 top-0 h-full w-full bg-black opacity-50'
            onClick={closeModal}></div>
          <div
            ref={modalRef}
            className='fixed left-1/2 top-1/2 h-[516px] w-[950px] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-lg bg-white p-[36px] shadow-lg'>
            <div>{children}</div>
          </div>
        </>
      )}
    </>
  );
}
