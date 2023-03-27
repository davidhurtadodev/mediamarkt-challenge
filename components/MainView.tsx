import { useEffect } from 'react';
import { fetchParcelsAsync } from '@/store/parcelSlice';
import { fetchCarriersAsync } from '@/store/carrierSlice';
import { fetchItemsAsync } from '@/store/itemSlice';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { useAppDispatch } from '@/store/hooks';
import ParcelDetailsPage from './ParcelView';

import ParcelListPage from './ParcelListView';
import ListOfParcelListsPage from './ListOfParcelLists';

// export default function Main() {
//   return <ListOfParcelListsPage />;
// }
