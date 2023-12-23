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
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAuthStatus.fulfilled, (state, { payload }) => {
      state.isUserSignIn = payload;
    });
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
