import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: 'user',
  clientLogged: {}
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setClientLogged: (state, action) => {
      state.clientLogged = action.payload;
    },
  },
});

export const { setOrigin, setClientLogged } = appSlice.actions;

export default appSlice.reducer;