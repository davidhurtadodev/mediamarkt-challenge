import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { changeAsideState } from '@/store/UISlice';
import AsideSection from './AsideSection';
import FormParcelCarrier from './Form/FormParcelCarrier';
import Button from './Button';
import ParcelListContainer from './ParcelListContainer';
import Image from 'next/image';
import plus from '@/public/assets/icons/plus.svg';

export default function ListOfParcelLists() {
  const dispatch = useAppDispatch();
  const asideState = useAppSelector(
    (state: RootState) => state.UI.asideSection
  );
  const parcelListsState = useAppSelector(
    (state: RootState) => state.parcel.parcelLists
  );
  const addParcelBtnHandler = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(
      changeAsideState({
        isVisible: true,
        type: 'add-parcel',
      })
    );
  };

  return (
    <div
      className={`px-5 pt-12  h-full ${
        asideState.isVisible ? 'overflow-y-hidden' : ''
      }`}
    >
      <h1 className="font-medium px-[14px] text-2xl text-gray mb-6">
        Parcel Lists
      </h1>

      {parcelListsState.length > 0
        ? parcelListsState.map(([pickupDate, parcels]) => {
            return (
              <ParcelListContainer
                key={pickupDate}
                pickUpDate={pickupDate}
                parcelList={parcels}
              />
            );
          })
        : null}

      <div className="flex justify-center fixed bottom-14 w-full left-0">
        <Button
          classNames="fixed rounded-full flex justify-center items-center w-12 h-12"
          onClick={addParcelBtnHandler}
          buttonShape="circle"
        >
          <Image src={plus} alt="add parcel" />
        </Button>
      </div>
      <AsideSection>
        <FormParcelCarrier />
      </AsideSection>
    </div>
  );
}
