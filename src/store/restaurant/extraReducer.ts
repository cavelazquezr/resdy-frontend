import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { ISlice } from './reducer';
import { getRestaurantsThunk } from './thunk';
import { THUNK_STATE } from '../../types';

export const getRestaurantsExtraReducer = (builder: ActionReducerMapBuilder<ISlice>) => [
	builder.addCase(getRestaurantsThunk.pending, (state) => ({
		...state,
		currentRestaurant: {
			thunkState: THUNK_STATE.PENDING,
			data: null,
		},
	})),
	builder.addCase(getRestaurantsThunk.rejected, (state) => {
		return {
			...state,
			currentRestaurant: {
				thunkState: THUNK_STATE.REJECTED,
				data: null,
			},
		};
	}),
	builder.addCase(getRestaurantsThunk.fulfilled, (state, action) => ({
		...state,
		currentRestaurant: {
			thunkState: THUNK_STATE.FULFILLED,
			data: action.payload[0],
		},
	})),
];
