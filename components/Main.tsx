import { useEffect } from 'react';
import { fetchParcelsAsync } from '@/store/parcelSlice';
import { fetchCarriersAsync } from '@/store/carrierSlice';
import { fetchItemsAsync } from '@/store/itemSlice';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { useAppDispatch } from '@/store/hooks';
import ParcelDetailsPage from './ParcelDetailsPage';

import ParcelListPage from './ParcelListPage';
import ListOfParcelListsPage from './ListOfParcelListsPage';

export default function Main() {
  const dispatch = useAppDispatch();

  const viewValue = useAppSelector((state: RootState) => state.UI.view.value);

  useEffect(() => {
    dispatch(fetchParcelsAsync());
    dispatch(fetchCarriersAsync());
    dispatch(fetchItemsAsync());
  }, [dispatch]);

  // the ideal solution is using NextJs routing, but it's more complex to implement
  if (viewValue === 'listOfParcelLists') return <ListOfParcelListsPage />;
  else if (viewValue === 'parcelList') {
    return <ParcelListPage />;
  } else if (viewValue === 'parcel') {
    return <ParcelDetailsPage />;
  }
  return null;
}
