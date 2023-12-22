import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SideMenuOptions } from '../types';

export const initialState = {
  userEndpoint: 'rickandmortyapi.com/graphql/',
  request: {
    query: '',
    variables: '',
    headers: ''
  },
  sideMenuMode: SideMenuOptions.Hidden,
  response: {},
  isUserSignIn: false
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    toggleSideMenu: (state, { payload }: PayloadAction<SideMenuOptions>) => {
      state.sideMenuMode = payload;
    },
    updateUserEndpoint(state, { payload }: PayloadAction<string>) {
      state.userEndpoint = payload;
    },
    updateUserQuery(state, { payload }: PayloadAction<string>) {
      state.request.query = payload;
    },
    updateUserVars(state, { payload }: PayloadAction<string>) {
      state.request.variables = payload;
    },
    updateUserHeaders(state, { payload }: PayloadAction<string>) {
      state.request.headers = payload;
    },
    updateUserStatus(state, { payload }: PayloadAction<boolean>) {
      state.isUserSignIn = payload;
    }
  }
});

export const {
  updateUserEndpoint,
  updateUserQuery,
  updateUserVars,
  updateUserHeaders,
  toggleSideMenu,
  updateUserStatus
} = projectSlice.actions;

export default projectSlice.reducer;
