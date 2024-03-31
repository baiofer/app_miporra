import { combineReducers } from '@reduxjs/toolkit';
import originReducer from './originReducer';

const rootReducer = combineReducers({
    origin: originReducer,
});

export default rootReducer;
