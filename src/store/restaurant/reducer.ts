import { createSlice } from '@reduxjs/toolkit';

import { getRestaurantsExtraReducer } from './extraReducer';
import { StatePropWithThunkState } from '../../types';
import { RestaurantOutput } from '../../types/restaurants';
import { SLICE_NAMES } from '../constant';

export interface ISlice {
	currentRestaurant: StatePropWithThunkState<RestaurantOutput | null> | null;
}

const sliceInitialState: ISlice = {
	currentRestaurant: null,
};

const authSlice = createSlice({
	name: SLICE_NAMES.USER,
	initialState: sliceInitialState,
	reducers: {},
	extraReducers: (builder) => {
		getRestaurantsExtraReducer(builder);
	},
});

export const actions = authSlice.actions;
export default authSlice.reducer;
