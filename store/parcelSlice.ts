import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Parcel, ParcelWithCarrier } from '@/lib/types/Parcel';
import parcelServices from '@/lib/services/parcelServices';
// import itemsService from '@/lib/services/itemsService';

// Type of state
export interface parcelState {
  value: Parcel[];
  parcelLists: [string, ParcelWithCarrier[]][];
  status: 'idle' | 'loading' | 'failed';
}

// Initial state

const initialState: parcelState = {
  value: [],
  parcelLists: [],
  status: 'idle',
};

export const fetchParcelsAsync = createAsyncThunk(
  'parcels/fetchParcels',
  async () => {
    const parcels = await parcelServices.getAll();
    return parcels;
  }
);

// export const createItemAsync = createAsyncThunk(
//   'items/createAsync',
//   async (content: Item) => {
//     const item = await itemsService.create(content);
//     return item;
//   }
// );

export const parcelSlice = createSlice({
  name: 'parcels',
  initialState,
  reducers: {
    addParcelToList: (state, action) => {
      const parcel = state.value.find((parcel: Parcel) => {
        return parcel.id.$oid === action.payload.parcelId ? parcel : null;
      });
      if (!parcel) {
        return;
      }

      const isDefinedPickupDateList = state.parcelLists.find(
        ([pickupDate, parcels]) => {
          return pickupDate === parcel?.pickupDate;
        }
      );
      if (!isDefinedPickupDateList) {
        state.parcelLists.push([
          parcel?.pickupDate,
          [
            {
              ...parcel,
              carrier: { $oid: 'het32r0g0u78' },
            },
          ],
        ]);
      }
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchParcelsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchParcelsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchParcelsAsync.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const { addParcelToList } = parcelSlice.actions;

export default parcelSlice.reducer;
