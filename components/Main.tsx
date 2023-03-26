import { useEffect } from 'react';
import { fetchParcelsAsync } from '@/store/parcelSlice';
import { fetchCarriersAsync } from '@/store/carrierSlice';
import { changeAsideState } from '@/store/UISlice';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { useAppDispatch } from '@/store/hooks';
import { Parcel } from '@/lib/types/Parcel';
import Image from 'next/image';
import ParcelListContainer from './ParcelListContainer';
import Button from './Button';
import plus from '@/public/assets/icons/plus.svg';
import AsideSection from './AsideSection';
import Modal from './Modal/Modal';
import ModalSuccess from './Modal/ModalSuccess';

export default function Main() {
  const dispatch = useAppDispatch();
  const asideState = useAppSelector(
    (state: RootState) => state.UI.asideSection
  );
  const parcels = useAppSelector((state: RootState) => state.parcel.value);
  useEffect(() => {
    dispatch(fetchParcelsAsync());
    dispatch(fetchCarriersAsync());
  }, [dispatch]);

  const addParcelBtnHandler = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(
      changeAsideState({
        isVisible: true,
        type: 'add-parcel',
      })
    );
  };

  interface GroupedByDateParcels {
    [key: string]: Parcel[];
  }
  //   const parcelsGroupedByDate: GroupedByDateParcels = parcels.reduce(
  //     (acc, current) => {
  //       const pickupDate = current.pickupDate;
  //       if (!acc[pickupDate]) {
  //         acc[pickupDate as keyof typeof someObj] = [];
  //       }
  //       acc[pickupDate as keyof {}].push(current);
  //       return acc;
  //     },
  //     {}
  //   );
  const parcelsGroupedByDate: GroupedByDateParcels = parcels.reduce(
    (acc, current) => {
      const pickupDate = current.pickupDate;
      if (!acc.hasOwnProperty(pickupDate)) {
        acc[pickupDate] = [];
      }
      acc[pickupDate].push(current);
      return acc;
    },
    {}
  );

  const arrayOfGroupedParcels = Object.entries(parcelsGroupedByDate);
  console.log(arrayOfGroupedParcels);
  arrayOfGroupedParcels.sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);

    return dateA - dateB;
  });

  //   console.log(parcelsGroupedByDate);
  //   console.log(arrayOfGroupedParcels);
  console.table(arrayOfGroupedParcels);

  return (
    <div
      className={`px-5 pt-12  h-full ${
        asideState.isVisible ? 'overflow-y-hidden' : ''
      }`}
    >
      <h1 className="font-medium px-[14px] text-2xl text-gray mb-6">
        Parcel Lists
      </h1>
      {arrayOfGroupedParcels.map(([pickUpDate, parcels]) => {
        return (
          <ParcelListContainer
            key={pickUpDate}
            pickUpDate={pickUpDate}
            parcels={parcels}
          />
        );
      })}

      <div className="flex justify-center fixed bottom-14 w-full left-0">
        <Button
          classNames="fixed rounded-full flex justify-center items-center w-12 h-12"
          onClick={addParcelBtnHandler}
          buttonShape="circle"
        >
          <Image src={plus} alt="add parcel" />
        </Button>
      </div>
      <AsideSection />
    </div>
  );
}
