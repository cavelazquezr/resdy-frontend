import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { ISlice } from './reducer';
import { getAccessTokenThunk, getCurrentUserThunk, updateUserThunk } from './thunk';
import { THUNK_STATE } from '../../types';

export const getCurrentUserExtraReducer = (builder: ActionReducerMapBuilder<ISlice>) => [
	builder.addCase(getCurrentUserThunk.pending, (state) => ({
		...state,
		userData: {
			thunkState: THUNK_STATE.PENDING,
			data: null,
		},
	})),
	builder.addCase(getCurrentUserThunk.rejected, (state) => {
		return {
			...state,
			userData: {
				thunkState: THUNK_STATE.REJECTED,
				data: null,
			},
		};
	}),
	builder.addCase(getCurrentUserThunk.fulfilled, (state, action) => ({
		...state,
		userData: {
			thunkState: THUNK_STATE.FULFILLED,
			data: action.payload,
		},
	})),
];

export const getAccessTokenExtraReducer = (builder: ActionReducerMapBuilder<ISlice>) => [
	builder.addCase(getAccessTokenThunk.pending, (state) => ({
		...state,
		accessToken: {
			thunkState: THUNK_STATE.PENDING,
			data: null,
		},
	})),
	builder.addCase(getAccessTokenThunk.rejected, (state, action) => {
		const error: string = action.error?.message || 'An error occurred';
		return {
			...state,
			accessToken: {
				thunkState: THUNK_STATE.REJECTED,
				data: null,
			},
			// TODO: Mejor manera de enseñar el error al usuario?
			error: error.includes('403') ? 'El correo electrónico o contraseña son incorrectos' : error,
		};
	}),
	builder.addCase(getAccessTokenThunk.fulfilled, (state, action) => ({
		...state,
		accessToken: {
			thunkState: THUNK_STATE.FULFILLED,
			data: action.payload.token,
		},
		error: null,
	})),
];

export const updateUserExtraReducer = (builder: ActionReducerMapBuilder<ISlice>) => [
	builder.addCase(updateUserThunk.pending, (state) => ({
		...state,
		userData: {
			thunkState: THUNK_STATE.PENDING,
			data: null,
		},
	})),
	builder.addCase(updateUserThunk.rejected, (state, action) => {
		const error: string = action.error?.message || 'An error occurred';
		return {
			...state,
			userData: {
				thunkState: THUNK_STATE.REJECTED,
				data: null,
			},
			// TODO: Mejor manera de enseñar el error al usuario?
			error: error.includes('403') ? 'El correo electrónico o contraseña son incorrectos' : error,
		};
	}),
	builder.addCase(updateUserThunk.fulfilled, (state, action) => ({
		...state,
		userData: {
			thunkState: THUNK_STATE.FULFILLED,
			data: action.payload,
		},
		error: null,
	})),
];
