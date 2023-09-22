/* eslint-disable no-console */
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {NewRecipe} from '../../types';

const headers = {
    authid: 'iN0Oms06Z4g0sLEzzsii4SQFTaM2',
    'Content-Type': 'application/json',
};

export const getRecipes = createAsyncThunk('recipes/getRecipes', async () => {
    try {
        const response = await axios.get(`/getRecipes`, {headers});
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch recipes. Please try again later.');
    }
});

export const addRecipe = createAsyncThunk('recipes/addRecipes', async (recipeData: NewRecipe) => {
    try {
        const response = await axios.post(`/addRecipe`, {recipe: recipeData}, {headers});
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to add a recipe recipes. Please try again later.');
    }
});

export const deleteRecipe = createAsyncThunk('recipes/deleteRecipe', async (recipeId: string) => {
    try {
        const response = await axios.delete(`/deleteRecipe?recipeId=${recipeId}`, {headers});
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to delete recipe. Please try again later.');
    }
});

export const updateRecipe = createAsyncThunk('recipes/updateRecipe', async ({recipeId, recipe}: {recipeId: string; recipe: NewRecipe}) => {
    try {
        const apiUrl = `/updateRecipe`;
        const response = await axios.patch(apiUrl, {recipeId, recipe}, {headers});

        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to update recipe. Please try again later.');
    }
});
