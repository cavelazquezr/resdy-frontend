import { createSlice } from '@reduxjs/toolkit';

import { SortRestaurantBy } from '../../types/restaurants';
import { SLICE_NAMES } from '../constant';

export interface ISlice {
	sortRestaurantsBy: SortRestaurantBy;
	typeFilter: string | null;
	typeFilterOptions: Array<string>;
	lastSelectedRestaurant: string | null;
	selectedRestaurant: string | null;
	hoveredRestaurant: string | null;
}

const sliceInitialState: ISlice = {
	sortRestaurantsBy: null,
	typeFilter: null,
	typeFilterOptions: [],
	lastSelectedRestaurant: null,
	selectedRestaurant: null,
	hoveredRestaurant: null,
};

const mapNavigationSlice = createSlice({
	name: SLICE_NAMES.MAP_NAVIGATION,
	initialState: sliceInitialState,
	reducers: {
		setLastSelectedRestaurant: (state, action) => {
			state.lastSelectedRestaurant = action.payload;
		},
		setTypeFilter: (state, action) => {
			state.typeFilter = action.payload;
		},
		setTypeFilterOptions: (state, action) => {
			state.typeFilterOptions = action.payload;
		},
		setSortRestaurantsBy: (state, action) => {
			state.sortRestaurantsBy = action.payload;
		},
		resetSortRestaurantsBy: (state) => {
			state.sortRestaurantsBy = null;
		},
		resetHoveredRestaurant: (state) => {
			state.hoveredRestaurant = null;
		},
		setHoveredRestaurant: (state, action) => {
			state.hoveredRestaurant = action.payload;
		},
		resetSelectedRestaurant: (state) => {
			state.selectedRestaurant = null;
		},
		setSelectedRestaurant: (state, action) => {
			state.selectedRestaurant = action.payload;
		},
	},
});

export const actions = mapNavigationSlice.actions;
export default mapNavigationSlice.reducer;
