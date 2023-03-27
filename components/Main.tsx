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

  if (viewValue === 'listOfParcelLists') return <ListOfParcelLists />;
  else if (viewValue === 'parcelList') {
    return <ParcelListDetails />;
  } else if (viewValue === 'parcel') {
    return <ParcelDetails />;
  }
}
