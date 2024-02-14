import { createAsyncThunk } from '@reduxjs/toolkit';

import { GetRestaurantsParams, getRestaurants } from '../../api/restautants';
import { SLICE_NAMES } from '../constant';

export const getRestaurantsThunk = createAsyncThunk(
	`${SLICE_NAMES.RESTAURANT}/getRestaurantsThunk`,
	async (payload: GetRestaurantsParams) => {
		const response = await getRestaurants(payload);
		return response.data;
	},
);
