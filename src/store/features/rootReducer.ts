import {combineReducers} from '@reduxjs/toolkit';
import {recipeSlice} from './recipeSlice';
import {userSlice} from './userSlice';

export const rootReducer = combineReducers({
    [recipeSlice.name]: recipeSlice.reducer,
    [userSlice.name]: userSlice.reducer,
});

export default rootReducer;
