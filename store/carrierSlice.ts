import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Carrier } from '@/lib/types/Carrier';
import parcelServices from '@/lib/services/parcelServices';
import carrierService from '@/lib/services/carrierService';

// Type of state
export interface carrierState {
  value: Carrier[];
  status: 'idle' | 'loading' | 'failed';
}

// Initial state

const initialState: carrierState = {
  value: [],
  status: 'idle',
};

export const fetchCarriersAsync = createAsyncThunk(
  'carrier/fetchCarriers',
  async () => {
    const carriers = await carrierService.getAll();
    return carriers;
  }
);

// export const createItemAsync = createAsyncThunk(
//   'items/createAsync',
//   async (content: Item) => {
//     const item = await itemsService.create(content);
//     return item;
//   }
// );

export const carrierSlice = createSlice({
  name: 'carrier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchCarriersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarriersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchCarriersAsync.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default carrierSlice.reducer;
