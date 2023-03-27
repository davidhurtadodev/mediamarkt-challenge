import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
  view: {
    value: string;
  };
  modal: {
    isVisible: boolean;
    type: string | null;
  };
  asideSection: {
    isVisible: boolean;
    type: string | null;
  };
}

const initialState: UIState = {
  view: {
    value: 'listOfParcelLists',
  },
  modal: {
    isVisible: false,
    type: '',
  },
  asideSection: {
    isVisible: false,
    type: null,
  },
};

export const UISlice = createSlice({
  name: 'UI',
  initialState: initialState,
  reducers: {
    changeAsideState: (state, action) => {
      state.asideSection = action.payload;
    },
    changeSelectedParcelList: (state, action) => {
      state.selectedParcelList.date = action.payload;
    },
    changeViewValue: (state, action) => {
      state.view.value = action.payload;
    },
    changeSelectedParcel: (state, action) => {
      state.selectedParcel.id = action.payload;
    },
  },
});
export const {
  changeAsideState,
  changeSelectedParcelList,
  changeViewValue,
  changeSelectedParcel,
} = UISlice.actions;

export default UISlice.reducer;
