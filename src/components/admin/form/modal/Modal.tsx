import { ReactNode } from 'react';

import s from './Modal.module.css';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className={s.modalOverlay} onClick={props.toggle}>
          <div className={s.modalBox} onClick={(e) => e.stopPropagation()}>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
