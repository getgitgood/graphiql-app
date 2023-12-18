import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SideMenuOptions, SideMenuState } from '../../types/appTypes';

const initialState: SideMenuState = {
  value: SideMenuOptions.Hidden
};

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    toggleSideMenu: (state, action: PayloadAction<SideMenuOptions>) => {
      state.value = action.payload;
    }
  }
});

export const { toggleSideMenu } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;
