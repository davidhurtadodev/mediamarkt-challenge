import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { changeAsideState } from '@/store/UISlice';
import { RootState } from '@/store';
import SignatureComponent from './SignatureComponent';
import FormParcelCarrier from './Form/FormParcelCarrier';
import FormDriver from './Form/FormDriver';

export default function AsideSection() {
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
        {asideState.type === 'add-parcel' && <FormParcelCarrier />}
        {asideState.type === 'check-driver' && <FormDriver />}

        {asideState.type === 'signature' && <SignatureComponent />}
      </aside>
    </div>
  ) : null;
}
