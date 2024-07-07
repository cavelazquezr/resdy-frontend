import { createSlice } from '@reduxjs/toolkit';

import { getMyRestaurantExtraReducer } from './extraReducer';
import { StatePropWithThunkState } from '../../types';
import { RestaurantRecord } from '../../types/restaurants';
import { SLICE_NAMES } from '../constant';

export interface ISlice {
	restaurantData: StatePropWithThunkState<RestaurantRecord | null> | null;
}

const sliceInitialState: ISlice = {
	restaurantData: null,
};

const restaurantSlice = createSlice({
	name: SLICE_NAMES.RESTAURANT,
	initialState: sliceInitialState,
	reducers: {
		clearRestaurantInfo: (state) => {
			state.restaurantData = null;
		},
	},
	extraReducers: (builder) => {
		getMyRestaurantExtraReducer(builder);
	},
});

export const { clearRestaurantInfo } = restaurantSlice.actions;
export default restaurantSlice.reducer;
