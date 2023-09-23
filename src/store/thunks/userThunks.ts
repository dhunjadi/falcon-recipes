/* eslint-disable no-console */
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {User} from '../../types';

const headers = {
    authid: 'iN0Oms06Z4g0sLEzzsii4SQFTaM2',
    'Content-Type': 'application/json',
};

export const getAppUsers = createAsyncThunk('user/getAppUsers', async () => {
    try {
        const response = await axios.get(`/getAppUsers`, {headers});
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed fetch users. Please try again later.');
    }
});

export const getAppUser = createAsyncThunk('user/getAppUser', async (appUserId: string) => {
    try {
        const response = await axios.get(`/getAppUser?appUserId=${appUserId}`, {headers});
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed fetch the user. Please try again later.');
    }
});

export const registerUser = createAsyncThunk('user/registerUser', async ({name, email, password}: User) => {
    try {
        const response = await axios.post(`/registerUser`, {name, email, password}, {headers});
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to add a new user. Please try again later.');
    }
});

export const userlogin = createAsyncThunk('user/userLogin', async ({email, password}: Pick<User, 'email' | 'password'>) => {
    try {
        const response = await axios.post(`/userLogin`, {email, password}, {headers});
        return response;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to login. Please try again later.');
    }
});
