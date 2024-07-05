import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';

export const checkIfEmailIsUsed: CustomAxiosRequest<{ email: string }, boolean> = (args) => {
	const url = `${envConfig.API_URL}/verification/emailUsed`;

	const config: AxiosRequestConfig<{ email: string }> = {
		method: 'POST',
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		data: args,
	};
	return axios(config);
};
export const checkIfRestaurantNameIsUsed: CustomAxiosRequest<{ name: string }, boolean> = (args) => {
	const url = `${envConfig.API_URL}/verification/restaurantNameUsed`;

	const config: AxiosRequestConfig<{ name: string }> = {
		method: 'POST',
		url,
		headers: {
			'Content-Type': 'application/json',
		},
		data: args,
	};
	return axios(config);
};
