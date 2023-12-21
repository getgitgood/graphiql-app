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
  response: {}
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    toggleSideMenu: (state, { payload }: PayloadAction<SideMenuOptions>) => {
      state.sideMenuMode = payload;
    },
    updateUserEndpoint(state, { payload }) {
      state.userEndpoint = payload;
    },
    updateUserQuery(state, { payload }) {
      state.request.query = payload;
    },
    updateUserVars(state, { payload }) {
      state.request.variables = payload;
    },
    updateUserHeaders(state, { payload }) {
      state.request.headers = payload;
    },
    updateResponse(state, { payload }) {
      state.response = payload;
    }
  }
});

export const {
  updateUserEndpoint,
  updateUserQuery,
  updateUserVars,
  updateUserHeaders,
  updateResponse,
  toggleSideMenu
} = projectSlice.actions;

export default projectSlice.reducer;
