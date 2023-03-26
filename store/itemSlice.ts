import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Item } from '@/lib/types/Item';
import itemService from '@/lib/services/itemService';

// Type of state
export interface carrierState {
  value: Item[];
  status: 'idle' | 'loading' | 'failed';
}

// Initial state

const initialState: carrierState = {
  value: [],
  status: 'idle',
};

export const fetchItemsAsync = createAsyncThunk('item/fetchItems', async () => {
  const items = await itemService.getAll();
  return items;
});

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
