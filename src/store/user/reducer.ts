import { createSlice } from '@reduxjs/toolkit';

import { getAccessTokenExtraReducer, getCurrentUserExtraReducer } from './extraReducer';
import { StatePropWithThunkState } from '../../types';
import { UserRecord } from '../../types/user';
import { SLICE_NAMES } from '../constant';

export interface ISlice {
	userData: StatePropWithThunkState<UserRecord | null> | null;
	accessToken: StatePropWithThunkState<string | null> | null;
	error: string | null;
}

const sliceInitialState: ISlice = {
	userData: null,
	accessToken: null,
	error: null,
};

const authSlice = createSlice({
	name: SLICE_NAMES.USER,
	initialState: sliceInitialState,
	reducers: {
		logoutUser: (state) => {
			state.userData = null;
			state.accessToken = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		getCurrentUserExtraReducer(builder);
		getAccessTokenExtraReducer(builder);
	},
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
