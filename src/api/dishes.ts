import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';
import { DishCreateInput, DishOutput, DishUpdateInput } from '../types/dishes';

export const getMyDishes: CustomAxiosRequest<undefined, Array<DishOutput>> = () => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/dishes/admin/myDishes`;
	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	return axios(config);
};

export const createDish: CustomAxiosRequest<DishCreateInput, DishOutput> = (args) => {
	const { restaurantName, ...input } = args;
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/dishes/${restaurantName}`;
	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: input,
	};
	return axios(config);
};

export const updateDish: CustomAxiosRequest<DishUpdateInput, DishOutput> = ({ dishId, ...args }) => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/dishes/${dishId}`;
	const config: AxiosRequestConfig = {
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

export const deleteDish: CustomAxiosRequest<string, undefined> = (dishId) => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/dishes/${dishId}`;
	const config: AxiosRequestConfig = {
		method: 'DELETE',
		url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	return axios(config);
};
