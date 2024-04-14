import { combineReducers } from '@reduxjs/toolkit';
import { originReducer } from './authReducer';

const rootReducer = combineReducers({
    origin: originReducer,
});

export default rootReducer;
