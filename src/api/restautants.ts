import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';
import { ResultsSummary } from '../types';
import { RestaurantCardOutput } from '../types/common';
import {
	GetDiscoveryRestaurantsQueryParams,
	GetRestaurantsQueryParams,
	LandingRestaurantInfo,
	RestaurantCreateInput,
	RestaurantRecord,
	UpdateRestaurantInput,
} from '../types/restaurants';

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

export const getMyRestaurant = () => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/restaurant/myRestaurant`;
	const config = {
		method: 'GET',
		url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	return axios(config);
};

export const updateRestaurant: CustomAxiosRequest<
	UpdateRestaurantInput & { restaurant_id: string },
	RestaurantRecord
> = (params) => {
	const { restaurant_id, ...data } = params;
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/restaurant/${restaurant_id}`;
	const config: AxiosRequestConfig<UpdateRestaurantInput> = {
		method: 'PUT',
		url,
		data,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
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

export const getDiscoverRestaurants: CustomAxiosRequest<
	GetDiscoveryRestaurantsQueryParams,
	ResultsSummary<RestaurantCardOutput<unknown>>
> = (params) => {
	const url = `${envConfig.API_URL}/restaurant/discover`;
	const config: AxiosRequestConfig<Array<RestaurantCardOutput<unknown>>> = {
		method: 'GET',
		url,
		params,
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return axios(config);
};

export const createRestaurant: CustomAxiosRequest<RestaurantCreateInput, { token: string }> = (data) => {
	const url = `${envConfig.API_URL}/restaurant`;
	const config: AxiosRequestConfig<RestaurantCreateInput> = {
		method: 'POST',
		url,
		data,
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return axios(config);
};
