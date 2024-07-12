import * as yup from 'yup';

import { ErrorMessages } from '../../../../types/errorMessages';

export const updateRestaurantInfoSchema = yup.object({
	restaurant_type: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	city: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	postal_code: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	address: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	phone: yup.number().required(ErrorMessages.FIELD_REQUIRED),
	description: yup
		.string()
		.max(500, 'La descripción no puede tener más de 500 caracteres.')
		.required(ErrorMessages.FIELD_REQUIRED),
	extra_description: yup
		.string()
		.max(500, 'La descripción no puede tener más de 500 caracteres.')
		.required(ErrorMessages.FIELD_REQUIRED),
	twitter: yup.string().optional(),
	instagram: yup.string().optional(),
	tiktok: yup.string().optional(),
	facebook: yup.string().optional(),
});
