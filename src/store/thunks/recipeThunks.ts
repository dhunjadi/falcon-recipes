/* eslint-disable no-console */
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const headers = {
    authid: 'iN0Oms06Z4g0sLEzzsii4SQFTaM2',
    'Content-Type': 'application/json',
};

export const getRecipes = createAsyncThunk('user/getRecipes', async () => {
    try {
        const response = await axios.get(`/getRecipes`, {headers});
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch recipes. Please try again later.');
    }
});
