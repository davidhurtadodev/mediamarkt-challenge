import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
  modal: {
    isVisible: boolean;
    type: string;
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
        type: ''
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
   
});
export const {
 
} = UISlice.actions;

export default UISlice.reducer;
