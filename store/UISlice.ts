import { createSlice } from '@reduxjs/toolkit';

// Shape of state
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
    type: 'add-parcel' | 'check-driver' | null;
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
    closeModal: (state, action) => {
      state.modal = initialState.modal;
    },
    openModal: (state, action) => {
      state.modal = {
        isVisible: true,
        type: action.payload,
      };
    },

    changeAsideState: (state, action) => {
      state.asideSection = action.payload;
    },

    changeViewValue: (state, action) => {
      state.view.value = action.payload;
    },
  },
});
export const { changeAsideState, closeModal, openModal, changeViewValue } =
  UISlice.actions;

export default UISlice.reducer;
