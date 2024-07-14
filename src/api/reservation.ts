import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';
import { MyReservationsQueryParams, ReservationRecord } from '../types/reservation';

export const getMyReservations: CustomAxiosRequest<MyReservationsQueryParams, ReservationRecord[]> = (params) => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/reservation/myReservations`;
	const config: AxiosRequestConfig<ReservationRecord[]> = {
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
