import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  userEndpoint: 'rickandmortyapi.com/graphql/',
  request: {
    query: '',
    variables: '',
    headers: ''
  },
  response: {}
};

// type ProjectSlicePayload = {
//   updateUserEndpoint(
//     state: {
//       userEndpoint: string;
//     },
//     {
//       payload
//     }: {
//       payload: string;
//       type: string;
//     }
//   ): void;
// };

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
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
  updateResponse
} = projectSlice.actions;

export default projectSlice.reducer;
