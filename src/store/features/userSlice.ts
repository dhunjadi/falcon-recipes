import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../types';
import {userlogin} from '../thunks/userThunks';

export type UserSliceState = {
    loggedInUser: User;
    isLoading: boolean;
};

const initialState: UserSliceState = {
    loggedInUser: {id: '', name: '', email: ''},
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        userLogout: () => initialState,
    },
    extraReducers(builder) {
        builder.addCase(userlogin.pending, (state: UserSliceState) => {
            state.isLoading = true;
        });
        builder.addCase(userlogin.fulfilled, (state: UserSliceState, action) => {
            state.loggedInUser = action.payload.data.appUser;
            state.isLoading = false;
        });
        builder.addCase(userlogin.rejected, (state: UserSliceState) => {
            state.isLoading = false;
        });
    },
});

export default userSlice.reducer;
export const {userLogout} = userSlice.actions;
