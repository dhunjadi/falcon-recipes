import {createSlice} from '@reduxjs/toolkit';
import {Recipe} from '../../types';
import {recipeList} from '../../data/recipeList';

export type RecipeSliceState = {
    recipeList: Recipe[];
};

const initialState: RecipeSliceState = {
    recipeList: recipeList,
};

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: initialState,
    reducers: {},
});

export default recipeSlice.reducer;
