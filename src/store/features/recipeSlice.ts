import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Recipe} from '../../types';
import {recipeList} from '../../data/recipeList';
import {addRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe} from '../thunks/recipeThunks';

export type RecipeSliceState = {
    recipeList: Recipe[];
    selectedRecipe: Recipe;
    isLoading: boolean;
};

const initialState: RecipeSliceState = {
    recipeList: recipeList,
    selectedRecipe: {id: '', title: '', dateCreated: '', authorId: '', instructions: [], tags: []},
    isLoading: false,
};

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: initialState,
    reducers: {
        clearSelectedRecipe: (state: RecipeSliceState) => {
            return {
                ...state,
                selectedRecipe: initialState.selectedRecipe,
            };
        },
    },
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

        builder.addCase(getRecipe.pending, (state: RecipeSliceState) => {
            state.isLoading = true;
        });
        builder.addCase(getRecipe.fulfilled, (state: RecipeSliceState, action: PayloadAction<{recipe: Recipe}>) => {
            state.selectedRecipe = action.payload.recipe;
            state.isLoading = false;
        });
        builder.addCase(getRecipe.rejected, (state: RecipeSliceState) => {
            state.isLoading = false;
        });

        builder.addCase(addRecipe.pending, (state: RecipeSliceState) => {
            state.isLoading = true;
        });
        builder.addCase(addRecipe.fulfilled, (state: RecipeSliceState, action: PayloadAction<Recipe>) => {
            state.recipeList = [...state.recipeList, action.payload];
            state.isLoading = false;
        });
        builder.addCase(addRecipe.rejected, (state: RecipeSliceState) => {
            state.isLoading = false;
        });

        builder.addCase(deleteRecipe.pending, (state: RecipeSliceState) => {
            state.isLoading = true;
        });
        builder.addCase(deleteRecipe.fulfilled, (state: RecipeSliceState, action: PayloadAction<string>) => {
            state.recipeList = state.recipeList.filter((recipe) => recipe.id !== action.payload);
            state.isLoading = false;
        });
        builder.addCase(deleteRecipe.rejected, (state: RecipeSliceState) => {
            state.isLoading = false;
        });

        builder.addCase(updateRecipe.pending, (state: RecipeSliceState) => {
            state.isLoading = true;
        });
        builder.addCase(updateRecipe.fulfilled, (state: RecipeSliceState, action: PayloadAction<Recipe>) => {
            state.recipeList = state.recipeList.map((recipe) => (recipe.id === action.payload.id ? action.payload : recipe));
            state.isLoading = false;
        });
        builder.addCase(updateRecipe.rejected, (state: RecipeSliceState) => {
            state.isLoading = false;
        });
    },
});

export default recipeSlice.reducer;
export const {clearSelectedRecipe} = recipeSlice.actions;
