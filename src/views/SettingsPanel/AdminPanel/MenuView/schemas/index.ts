import * as yup from 'yup';

import { ErrorMessages } from '../../../../../types/errorMessages';

export const createCategorySchema = yup.object({
	label: yup.string().required(ErrorMessages.FIELD_REQUIRED),
});

export const updateCategorySchema = yup.object({
	label: yup.string().required(ErrorMessages.FIELD_REQUIRED),
});

export const updateDishSchema = yup.object({
	name: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	description: yup
		.string()
		.max(500, 'La descripción no puede tener más de 500 caracteres.')
		.required(ErrorMessages.FIELD_REQUIRED),
	price: yup.number().required(ErrorMessages.FIELD_REQUIRED),
	allergen: yup.array().of(yup.string()).required(ErrorMessages.FIELD_REQUIRED),
});
