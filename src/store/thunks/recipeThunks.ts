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
