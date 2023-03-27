import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Item } from '@/lib/types/Item';
import itemService from '@/lib/services/itemService';

// Shape of state
export interface carrierState {
  value: Item[];
  status: 'idle' | 'loading' | 'failed';
}

// Initial state

const initialState: carrierState = {
  value: [],
  status: 'idle',
};

//Thunk for fetching items
export const fetchItemsAsync = createAsyncThunk('item/fetchItems', async () => {
  const items = await itemService.getAll();
  return items;
});

// Slice
export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //reducer for fetching data
    builder
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default itemSlice.reducer;
