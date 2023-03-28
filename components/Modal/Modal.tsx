import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { closeModal } from '@/store/UISlice';
import { RootState } from '@/store';
import ModalSuccess from './ModalSuccess';
import ModalError from './ModalError';
import useBrowserModal from '@/lib/useBrowserModal';

export default function Modal() {
  const dispatch = useAppDispatch();
  const isBrowser = useBrowserModal();

  const modalUIState = useAppSelector((state: RootState) => state.UI.modal);

  const handleCloseClick = () => {
    dispatch(closeModal(null));
  };

  const modalJSX = modalUIState.isVisible ? (
    <div
      className="fixed inset-0 z-50 bg-custom-overlay-opacity"
      onClick={() => handleCloseClick()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center bg-white rounded-[30px]  py-12 text-center relative mx-auto mt-44  z-50 opacity-100 w-[320px]  px-[34px]"
      >
        {modalUIState.type === 'error' ? <ModalError /> : null}
        {modalUIState.type === 'success' ? <ModalSuccess /> : null}
      </div>
    </div>
  ) : null;
  if (isBrowser) {
    return ReactDOM.createPortal(
      modalJSX,
      document.getElementById('modal-root')!
    );
  } else return null;
}
