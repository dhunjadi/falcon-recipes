import {createSlice} from '@reduxjs/toolkit';
import {Recipe} from '../../types';
import {recipeList} from '../../data/recipeList';
import {getRecipes} from '../thunks/recipeThunks';

export type RecipeSliceState = {
    recipeList: Recipe[];
    isLoading: boolean;
};

const initialState: RecipeSliceState = {
    recipeList: recipeList,
    isLoading: false,
};

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getRecipes.pending, (state: RecipeSliceState) => {
            state.isLoading = true;
        });
        builder.addCase(getRecipes.fulfilled, (state: RecipeSliceState, action) => {
            state.recipeList = action.payload.recipes;
            state.isLoading = false;
        });
        builder.addCase(getRecipes.rejected, (state: RecipeSliceState) => {
            state.isLoading = false;
        });
    },
});

export default recipeSlice.reducer;
