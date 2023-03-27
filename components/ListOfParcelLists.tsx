import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { changeAsideState } from '@/store/UISlice';
import Modal from './Modal/Modal';
import Button from './Button';
import ParcelListContainer from './ParcelListContainer';
import Image from 'next/image';
import plus from '@/public/assets/icons/plus.svg';

export default function ListOfParcelLists() {
  const dispatch = useAppDispatch();

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
    <>
      <Modal />
      <h1 className="font-medium px-[14px] text-2xl text-gray mb-6">
        Parcel Lists
      </h1>

      {/* if we have already assigned at least one parcel to a carrier */}
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
        {/* Add parcel to a carrier btn */}
        <Button
          classNames="fixed rounded-full flex justify-center items-center w-12 h-12"
          onClick={addParcelBtnHandler}
          buttonShape="circle"
        >
          <Image src={plus} alt="add parcel" />
        </Button>
      </div>
    </>
  );
}
