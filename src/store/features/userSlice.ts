import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../types';

export type UserSliceState = {
    loggedInUser: User;
};

const initialState: UserSliceState = {
    loggedInUser: {name: '', email: '', password: ''},
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
});

export default userSlice.reducer;
