import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAccessToken, getCurrentUser, postNewUser, updateUser } from '../../api/authentication';
import { UserCredentials } from '../../types/user';
import { SLICE_NAMES } from '../constant';

export const getCurrentUserThunk = createAsyncThunk(`${SLICE_NAMES.USER}/getCurrentUserThunk`, async () => {
	const response = await getCurrentUser(undefined);
	return response.data;
});

export const getAccessTokenThunk = createAsyncThunk(
	`${SLICE_NAMES.USER}/postUserCredentialsThunk`,
	async (payload: Parameters<typeof getAccessToken>[0], thunkApi) => {
		try {
			const response = await getAccessToken(payload);
			const token = response.data.token;

			localStorage.setItem('accessToken', token);

			thunkApi.dispatch(getCurrentUserThunk());

			return response.data;
		} catch (error) {
			console.error('Authentication failed:', error);
			throw error;
		}
	},
);

export const postNewUserThunk = createAsyncThunk(
	`${SLICE_NAMES.USER}/postNewUserThunk`,
	async (payload: Parameters<typeof postNewUser>[0], thunkApi) => {
		try {
			const response = await postNewUser(payload);
			const { email, password } = response.data;
			const credentials: UserCredentials = {
				email: email,
				password: password,
			};

			thunkApi.dispatch(getAccessTokenThunk(credentials));

			return response.data;
		} catch (error) {
			console.error('Authentication failed:', error);
			throw error;
		}
	},
);

export const updateUserThunk = createAsyncThunk(
	`${SLICE_NAMES.USER}/updateUserThunk`,
	async (payload: Parameters<typeof updateUser>[0], thunkApi) => {
		try {
			const response = await updateUser(payload);
			thunkApi.dispatch(getCurrentUserThunk());
			return response.data;
		} catch (error) {
			console.error('Update failed:', error);
			throw error;
		}
	},
);
