import {combineReducers} from '@reduxjs/toolkit';
import {recipeSlice} from './recipeSlice';

export const rootReducer = combineReducers({
    [recipeSlice.name]: recipeSlice.reducer,
});

export default rootReducer;
