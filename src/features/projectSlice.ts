import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userEndpoint: 'rickandmortyapi.com/graphql/'
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
    }
  }
});

export const { updateUserEndpoint } = projectSlice.actions;

export default projectSlice.reducer;
