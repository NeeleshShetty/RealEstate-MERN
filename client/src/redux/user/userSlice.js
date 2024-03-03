import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error:null
}

const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signInStart: (state) => {
			state.loading = true;
		},
		signInSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = false;
		},
		signInFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		updateUserStart: (state) => {
			state.loading = true;
		},
		updateUserSuccess: (state, action) => {
			state.currentUser = action.payload;
			(state.loading = false), (state.error = false);
		},
		updateUserFailure: (state, action) => {
			(state.loading = false), (state.error = action.payload);
		},
		deleteUserStart: (state) => {
			state.loading = true;
		},
		deleteUserSuccess: (state) => {
			state.currentUser =null;
			(state.loading = false), (state.error = false);
		},
		deleteUserFailure: (state, action) => {
			(state.loading = false), (state.error = action.payload);
        },
        signout: (state) => {
            state.currentUser = null
        }
	},
});


export const { signInFailure, signInStart, signInSuccess,updateUserFailure,updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signout } = UserSlice.actions

export default UserSlice.reducer