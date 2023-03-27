import { useState } from 'react';
import Select from 'react-select';
import Input from './Input';
import Button from './Button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { changeAsideState } from '@/store/UISlice';
import { addParcelToList } from '@/store/parcelSlice';
import { RootState } from '@/store';
import selectStyles from '@/lib/misc/selectStyles';

interface AsideSectionProps {
  children: React.ReactNode;
}

export default function AsideSection({ children }: AsideSectionProps) {
  const dispatch = useAppDispatch();

  //states
  const asideState = useAppSelector(
    (state: RootState) => state.UI.asideSection
  );

  const handleClickOutsideAside = () => {
    dispatch(
      changeAsideState({
        isVisible: false,
        type: null,
      })
    );
  };

  return asideState.isVisible ? (
    <div
      onClick={() => handleClickOutsideAside()}
      className="fixed inset-0 z-50 bg-custom-overlay-opacity w-full h-full"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="bg-white px-5 pt-7 pb-9 rounded-t-[30px] fixed w-full left-0 bottom-0 flex flex-col items-center"
      >
        {children}
      </aside>
    </div>
  ) : null;
}
