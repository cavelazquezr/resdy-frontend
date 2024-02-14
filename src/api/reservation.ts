import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';
import { GetMyReservationQueryParams, MyReservationOutput } from '../types/reservation';

export const getMyReservations: CustomAxiosRequest<GetMyReservationQueryParams, MyReservationOutput[]> = (params) => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/reservation/myReservations`;
	const config: AxiosRequestConfig<MyReservationOutput[]> = {
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
