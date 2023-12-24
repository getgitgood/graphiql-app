import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../services/firebaseAuth';
import { SideMenuOptions } from '../types';

interface ProjectState {
  userEndpoint: string;
  request: {
    query: string;
    variables: string;
    headers: string;
  };
  sideMenuMode: SideMenuOptions;
  response: object;
  isUserSignIn: boolean | null;
}

export const getUserAuthStatus = createAsyncThunk(
  'user/getAuthStatus',
  async () => {
    await auth.authStateReady();
    return Boolean(auth.currentUser);
  }
);

export const initialState: ProjectState = {
  userEndpoint: 'rickandmortyapi.com/graphql/',
  request: {
    query: '',
    variables: '',
    headers: ''
  },
  sideMenuMode: SideMenuOptions.Hidden,
  response: {},
  isUserSignIn: null
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
    updateUserRequest(
      state,
      {
        payload
      }: PayloadAction<{
        query: string;
        variables: string;
        headers: string;
      }>
    ) {
      state.request = payload;
    },
    updateUserStatus(state, { payload }: PayloadAction<boolean>) {
      state.isUserSignIn = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAuthStatus.fulfilled, (state, { payload }) => {
      state.isUserSignIn = payload;
    });
  }
});

export const {
  updateUserEndpoint,
  updateUserRequest,
  toggleSideMenu,
  updateUserStatus
} = projectSlice.actions;

export default projectSlice.reducer;
