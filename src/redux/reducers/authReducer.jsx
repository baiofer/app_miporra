import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


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

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(persistConfig, appSlice.reducer);

export default persistedReducer;