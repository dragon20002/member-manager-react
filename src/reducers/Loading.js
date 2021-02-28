import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, { payload }) => {
      state.count += 1;
      state[payload] = true;
    },
    finishLoading: (state, { payload }) => {
      state.count -= 1;
      state[payload] = false;
    },
  },
});

export const { startLoading, finishLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
