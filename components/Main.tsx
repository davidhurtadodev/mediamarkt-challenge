import { useEffect } from 'react';
import { fetchParcelsAsync } from '@/store/parcelSlice';
import { fetchCarriersAsync } from '@/store/carrierSlice';
import { fetchItemsAsync } from '@/store/itemSlice';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { useAppDispatch } from '@/store/hooks';
import ParcelDetails from './ParcelDetails';

import ParcelListDetails from './ParcelListDetails';
import ListOfParcelLists from './ListOfParcelLists';

export default function Main() {
  const dispatch = useAppDispatch();

  const viewValue = useAppSelector((state: RootState) => state.UI.view.value);

  useEffect(() => {
    dispatch(fetchParcelsAsync());
    dispatch(fetchCarriersAsync());
    dispatch(fetchItemsAsync());
  }, [dispatch]);

  //   interface GroupedByDateParcels {
  //     [key: string]: Parcel[];
  //   }
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
  //   const parcelsGroupedByDate: GroupedByDateParcels = parcels.reduce(
  //     (acc, current) => {
  //       const pickupDate = current.pickupDate;
  //       if (!acc.hasOwnProperty(pickupDate)) {
  //         acc[pickupDate] = [];
  //       }
  //       acc[pickupDate].push(current);
  //       return acc;
  //     },
  //     {}
  //   );

  //   const arrayOfGroupedParcels = Object.entries(parcelsGroupedByDate);
  //     console.log(arrayOfGroupedParcels);
  //   arrayOfGroupedParcels.sort((a, b) => {
  //     const dateA = new Date(a[0]);
  //     const dateB = new Date(b[0]);

  //     return dateA - dateB;
  //   });

  //   console.log(parcelsGroupedByDate);
  //   console.log(arrayOfGroupedParcels);
  //   console.table(arrayOfGroupedParcels);
  if (viewValue === 'listOfParcelLists')
    return (
      <ListOfParcelLists />
      // <div
      //   className={`px-5 pt-12  h-full ${
      //     asideState.isVisible ? 'overflow-y-hidden' : ''
      //   }`}
      // >
      //   <h1 className="font-medium px-[14px] text-2xl text-gray mb-6">
      //     Parcel Lists
      //   </h1>

      //   {parcelListsState.length > 0
      //     ? parcelListsState.map(([pickupDate, parcels]) => {
      //         return (
      //           <ParcelListContainer
      //             key={pickupDate}
      //             pickUpDate={pickupDate}
      //             parcelList={parcels}
      //           />
      //         );
      //       })
      //     : null}

      //   <div className="flex justify-center fixed bottom-14 w-full left-0">
      //     <Button
      //       classNames="fixed rounded-full flex justify-center items-center w-12 h-12"
      //       onClick={addParcelBtnHandler}
      //       buttonShape="circle"
      //     >
      //       <Image src={plus} alt="add parcel" />
      //     </Button>
      //   </div>
      //   <AsideSection />
      // </div>
    );
  else if (viewValue === 'parcelList') {
    return <ParcelListDetails />;
  } else if (viewValue === 'parcel') {
    return <ParcelDetails />;
  }
}
