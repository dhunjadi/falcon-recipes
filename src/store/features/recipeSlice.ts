import {createSlice} from '@reduxjs/toolkit';
import {Recipe} from '../../types';

export type RecipeSliceState = {
    recipeList: Recipe[];
};

const initialState: RecipeSliceState = {
    recipeList: [],
};

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: initialState,
    reducers: {},
});

export default recipeSlice.reducer;
