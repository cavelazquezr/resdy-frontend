import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAccessToken, getCurrentUser, postNewUser } from '../../api/authentication';
import { CreateUserInput, UserCredentials } from '../../types/user';
import { SLICE_NAMES } from '../constant';

export const getCurrentUserThunk = createAsyncThunk(
	`${SLICE_NAMES.USER}/getCurrentUserThunk`,
	async (payload: string) => {
		const response = await getCurrentUser(payload);
		return response.data;
	},
);

export const getAccessTokenThunk = createAsyncThunk(
	`${SLICE_NAMES.USER}/postUserCredentialsThunk`,
	async (payload: UserCredentials, thunkApi) => {
		try {
			const response = await getAccessToken(payload);
			const token = response.data.token;

			// Set the new token in localStorage
			localStorage.setItem('accessToken', token);

			// Dispatch the action to get the current user
			thunkApi.dispatch(getCurrentUserThunk(token));

			return response.data;
		} catch (error) {
			// Handle authentication error if needed
			console.error('Authentication failed:', error);
			throw error; // Rethrow the error to let the component handle it
		}
	},
);

export const postNewUserThunk = createAsyncThunk(
	`${SLICE_NAMES.USER}/postNewUserThunk`,
	async (payload: CreateUserInput, thunkApi) => {
		try {
			const response = await postNewUser(payload);
			const { email, password } = response.data;
			const credentials: UserCredentials = {
				email: email,
				password: password,
			};

			// Dispatch the action to get authenticated after creation
			thunkApi.dispatch(getAccessTokenThunk(credentials));

			return response.data;
		} catch (error) {
			// Handle authentication error if needed
			console.error('Authentication failed:', error);
			throw error; // Rethrow the error to let the component handle it
		}
	},
);
