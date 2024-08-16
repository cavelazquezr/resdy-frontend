import { createSlice } from '@reduxjs/toolkit';

import { MyCategoriesRecord } from '../../types/categories';
import { DishOutput } from '../../types/dishes';
import { SLICE_NAMES } from '../constant';

export interface ISlice {
	selectedCategory: MyCategoriesRecord | null;
	selectedDish: DishOutput | null;
}

const sliceInitialState: ISlice = {
	selectedCategory: null,
	selectedDish: null,
};

const restaurantSlice = createSlice({
	name: SLICE_NAMES.ADMIN,
	initialState: sliceInitialState,
	reducers: {
		setSelectedCategory: (state, action) => {
			state.selectedCategory = action.payload;
		},
		setSelectedDish: (state, action) => {
			state.selectedDish = action.payload;
		},
	},
});

export const { setSelectedCategory, setSelectedDish } = restaurantSlice.actions;
export default restaurantSlice.reducer;
