import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Parcel, ParcelWithCarrier } from '@/lib/types/Parcel';
import parcelServices from '@/lib/services/parcelServices';
// import itemsService from '@/lib/services/itemsService';

// Type of state
export interface parcelState {
  value: Parcel[];
  parcelLists: [string, ParcelWithCarrier[]][];

  selectedParcel: {
    id: string | null;
  };

  selectedParcelList: {
    date: string | null;
  };
  status: 'idle' | 'loading' | 'failed';
}

// Initial state

const initialState: parcelState = {
  value: [],
  parcelLists: [],
  status: 'idle',
  selectedParcel: {
    id: null,
  },
  selectedParcelList: {
    date: null,
  },
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
    changeSelectedParcelList: (state, action) => {
      state.selectedParcelList.date = action.payload;
    },
    changeSelectedParcel: (state, action) => {
      state.selectedParcel.id = action.payload;
    },
    changeParcelDeliveryState: (state, action) => {
      const parcelIdToChange: string = action.payload;
      const selectedParcelListIndex = state.parcelLists.findIndex(
        ([date, parcels]) => {
          return date === state.selectedParcelList.date;
        }
      );
      const selectedParcelIndex = state.parcelLists[
        selectedParcelListIndex
      ][1].findIndex((parcel) => {
        return parcel.id.$oid === parcelIdToChange;
      });

      state.parcelLists[selectedParcelListIndex][1][
        selectedParcelIndex
      ].isDelivered = true;
    },
    addParcelToList: (state, action) => {
      const parcel = state.value.find((parcel: Parcel) => {
        return parcel.id.$oid === action.payload.parcelId ? parcel : null;
      });
      if (!parcel) {
        return;
      }

      const pickupDateIndex = state.parcelLists.findIndex(
        ([pickupDate, parcels]) => {
          return pickupDate === parcel?.pickupDate;
        }
      );

      if (pickupDateIndex < 0) {
        state.parcelLists.push([
          parcel?.pickupDate,
          [
            {
              ...parcel,
              carrier: { $oid: action.payload.carrierId },
              isDelivered: false,
            },
          ],
        ]);
      } else {
        state.parcelLists[pickupDateIndex][1].push({
          ...parcel,
          carrier: { $oid: action.payload.carrierId },
          isDelivered: false,
        });
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

export const {
  addParcelToList,
  changeSelectedParcelList,
  changeSelectedParcel,
  changeParcelDeliveryState,
} = parcelSlice.actions;

export default parcelSlice.reducer;
