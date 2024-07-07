import { createAsyncThunk } from '@reduxjs/toolkit';

import { getMyRestaurant } from '../../api/restautants';
import { SLICE_NAMES } from '../constant';

export const getMyRestaurantThunk = createAsyncThunk(`${SLICE_NAMES.RESTAURANT}/getMyRestaurantThunk`, async () => {
	const response = await getMyRestaurant();
	return response.data;
});
