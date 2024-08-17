import axios, { AxiosRequestConfig } from 'axios';

import { CustomAxiosRequest } from '.';
import { envConfig } from '../config/env';
import { WithIsUsed } from '../types';
import { CategoryCreateInput, CategoryOutput, CategoryUpdateInput, MyCategoriesRecord } from '../types/categories';

export const getCategories: CustomAxiosRequest<string, WithIsUsed<CategoryOutput>[]> = (restaurantName) => {
	const url = `${envConfig.API_URL}/category/${restaurantName}`;
	const config: AxiosRequestConfig = {
		method: 'GET',
		url,
		headers: {
			'Content-Type': 'application/json',
		},
	};
	return axios(config);
};

export const getMyCategories: CustomAxiosRequest<string, WithIsUsed<MyCategoriesRecord>[]> = () => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/category/admin/myCategories`;
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

export const createCategory: CustomAxiosRequest<CategoryCreateInput, CategoryOutput> = ({ label, restaurantName }) => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/category/${restaurantName}`;
	const config: AxiosRequestConfig = {
		method: 'POST',
		url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: { label },
	};
	return axios(config);
};

export const updateCategory: CustomAxiosRequest<CategoryUpdateInput, CategoryOutput> = ({
	label,
	hide,
	categoryId,
}) => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/category/${categoryId}`;
	const config: AxiosRequestConfig = {
		method: 'PUT',
		url,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: { label, hide },
	};
	return axios(config);
};

export const deleteCategory: CustomAxiosRequest<string, CategoryOutput> = (categoryId) => {
	const token = localStorage.getItem('accessToken');
	const url = `${envConfig.API_URL}/category/${categoryId}`;
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
