/* eslint-disable no-console */
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {User} from '../../types';

const headers = {
    authid: 'iN0Oms06Z4g0sLEzzsii4SQFTaM2',
    'Content-Type': 'application/json',
};

export const registerUser = createAsyncThunk('user/registerUser', async ({name, email, password}: User) => {
    try {
        const response = await axios.post(`https://addappuser-zazjbx7nka-uc.a.run.app`, {name, email, password}, {headers});
        console.log(response.data);
    } catch (err) {
        console.error(err);
        throw new Error('Failed to add a new user. Please try again later.');
    }
});
