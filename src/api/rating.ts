import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';
import {
	GetMyRatingQueryParams,
	MyRatingOutput,
	RatingOutput,
	RatingStatsOutput,
	UpdateRatingRecord,
} from '../types/rating';

export type MyRatingsResponse = {
	ratings?: MyRatingOutput[];
	unique_values?: Record<string, string[]>;
};

export const getMyRatings: CustomAxiosRequest<GetMyRatingQueryParams, MyRatingsResponse> = (params) => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/rating/myRatings`;
	const config: AxiosRequestConfig<MyRatingsResponse> = {
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

export const getRatings: CustomAxiosRequest<string, RatingOutput[]> = (restaurantName) => {
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

export const putRating: CustomAxiosRequest<UpdateRatingRecord, RatingOutput> = (args) => {
	const { ratingId, ...ratingRecord } = args;
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/rating/${ratingId}`;

	const config: AxiosRequestConfig<UpdateRatingRecord> = {
		method: 'PUT',
		url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: ratingRecord,
	};
	return axios(config);
};
