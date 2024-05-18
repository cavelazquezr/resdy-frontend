import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';
import { GetRestaurantsQueryParams, LandingRestaurantInfo, RestaurantRecord } from '../types/restaurants';

export const getRestaurants: CustomAxiosRequest<GetRestaurantsQueryParams, RestaurantRecord[]> = (params) => {
	const url = `${envConfig.API_URL}/restaurant`;
	const config: AxiosRequestConfig<RestaurantRecord[]> = {
		method: 'GET',
		url,
		params,
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return axios(config);
};

export const getLandingRestaurants: CustomAxiosRequest<GetRestaurantsQueryParams, LandingRestaurantInfo> = (params) => {
	const url = `${envConfig.API_URL}/restaurant/landing`;
	const config: AxiosRequestConfig<LandingRestaurantInfo> = {
		method: 'GET',
		url,
		params,
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return axios(config);
};
