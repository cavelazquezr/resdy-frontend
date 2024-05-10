import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';

export const uploadAvatar: CustomAxiosRequest<FormData, void> = (args) => {
	const url = `${envConfig.API_URL}/upload/avatar`;
	const token = localStorage.getItem('accessToken');

	const config: AxiosRequestConfig<FormData> = {
		method: 'POST',
		url,
		headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
		data: args,
	};
	return axios(config);
};
