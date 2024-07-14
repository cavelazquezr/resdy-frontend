import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';
import { MenuRecord } from '../types/menu';

export const getMenu: CustomAxiosRequest<string, MenuRecord[]> = (restaurantName) => {
	const url = `${envConfig.API_URL}/menu/${restaurantName}`;
	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return axios(config);
};
