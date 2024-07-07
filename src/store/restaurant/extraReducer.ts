import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { ISlice } from './reducer';
import { getMyRestaurantThunk } from './thunk';
import { THUNK_STATE } from '../../types';

export const getMyRestaurantExtraReducer = (builder: ActionReducerMapBuilder<ISlice>) => [
	builder.addCase(getMyRestaurantThunk.pending, (state) => ({
		...state,
		restaurantData: {
			thunkState: THUNK_STATE.PENDING,
			data: null,
		},
	})),
	builder.addCase(getMyRestaurantThunk.rejected, (state) => {
		return {
			...state,
			restaurantData: {
				thunkState: THUNK_STATE.REJECTED,
				data: null,
			},
		};
	}),
	builder.addCase(getMyRestaurantThunk.fulfilled, (state, action) => ({
		...state,
		restaurantData: {
			thunkState: THUNK_STATE.FULFILLED,
			data: action.payload,
		},
	})),
];
