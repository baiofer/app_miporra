import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: 'user',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
  },
});

export const { setOrigin } = appSlice.actions;

export default appSlice.reducer;