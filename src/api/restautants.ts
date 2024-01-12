import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';
import { RestaurantOutput } from '../types/restaurants';

export interface GetRestaurantsParams {
	name?: string;
	city?: string;
	restaurant_type?: string;
	country?: string;
}

export const getRestaurants: CustomAxiosRequest<GetRestaurantsParams, RestaurantOutput[]> = (params) => {
	const url = `${envConfig.API_URL}/restaurant`;
	const config: AxiosRequestConfig<RestaurantOutput[]> = {
		method: 'GET',
		url,
		params,
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return axios(config);
};
