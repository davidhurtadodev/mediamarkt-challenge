import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
  modal: {
    isVisible: boolean;
    type: string | null;
  };
  asideSection: {
    isVisible: boolean;
    type: string | null;
  };

  selectedParcel: {
    id: string | null;
  };

  selectedParcelList: {
    id: string | null;
  };
}

const initialState: UIState = {
  modal: {
    isVisible: false,
    type: '',
  },
  asideSection: {
    isVisible: false,
    type: null,
  },

  selectedParcel: {
    id: null,
  },

  selectedParcelList: {
    id: null,
  },
};

export const UISlice = createSlice({
  name: 'UI',
  initialState: initialState,
  reducers: {
    changeAsideState: (state, action) => {
      state.asideSection = action.payload;
    },
  },
});
export const { changeAsideState } = UISlice.actions;

export default UISlice.reducer;
