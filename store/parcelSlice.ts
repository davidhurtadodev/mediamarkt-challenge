import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Parcel } from '@/lib/types/Parcel';
import parcelServices from '@/lib/services/parcelServices';
// import itemsService from '@/lib/services/itemsService';

// Type of state
export interface itemsState {
  value: Parcel[];
  status: 'idle' | 'loading' | 'failed';
}

// Initial state

const initialState: itemsState = {
  value: [],
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

export const itemsSlice = createSlice({
  name: 'parcels',
  initialState,
  reducers: {},
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

export default itemsSlice.reducer;
