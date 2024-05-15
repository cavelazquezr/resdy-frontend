import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';
import { RestaurantCardOutput } from '../types/common';
import {
	MyRatingQueryParams,
	RatingDetailOutput,
	RatingRecord,
	RatingStatsOutput,
	RatingUpdateRecord,
} from '../types/rating';

export const getMyRatings: CustomAxiosRequest<MyRatingQueryParams, Array<RestaurantCardOutput<RatingDetailOutput>>> = (
	params,
) => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/rating/myRatings`;
	const config: AxiosRequestConfig<Array<RestaurantCardOutput<RatingDetailOutput>>> = {
		method: 'GET',
		url,
		params,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	return axios(config);
};

export const getRatingStats: CustomAxiosRequest<string, RatingStatsOutput> = (restaurantName) => {
	const url = `${envConfig.API_URL}/rating/stats/${restaurantName}`;
	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return axios(config);
};

export const getRatings: CustomAxiosRequest<string, RatingRecord[]> = (restaurantName) => {
	const url = `${envConfig.API_URL}/rating/${restaurantName}`;
	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return axios(config);
};

export const putRating: CustomAxiosRequest<RatingUpdateRecord, RatingRecord> = (args) => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/rating/${args.id}`;

	const config: AxiosRequestConfig<RatingUpdateRecord> = {
		method: 'PUT',
		url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: args,
	};
	return axios(config);
};
