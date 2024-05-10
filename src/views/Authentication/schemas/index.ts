import * as yup from 'yup';

import { passwordRules } from '../../../config/standard/passwordRules';
import { ErrorMessages } from '../../../types/errorMessages';

export const loginSchema = yup.object({
	email: yup.string().email(ErrorMessages.INVALID_EMAIL).required(ErrorMessages.FIELD_REQUIRED),
	password: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	remember: yup.boolean().optional(),
});

export const registerSchema = yup.object({
	firstname: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	lastname: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	email: yup.string().email(ErrorMessages.INVALID_EMAIL).required(ErrorMessages.FIELD_REQUIRED),
	password: yup
		.string()
		.min(5, ErrorMessages.SHORT_PASSWORD)
		.max(20, ErrorMessages.LONG_PASSWORD)
		.matches(passwordRules, { message: ErrorMessages.WEAK_PASSWORD })
		.required(ErrorMessages.FIELD_REQUIRED),
	repeatPassword: yup
		.string()
		.oneOf([yup.ref('password')], ErrorMessages.PASSWORD_DOESNT_MATCH)
		.required(ErrorMessages.FIELD_REQUIRED),
});

export const adminRegisterStep1Schema = yup.object({
	email: yup.string().email(ErrorMessages.INVALID_EMAIL).required(ErrorMessages.FIELD_REQUIRED),
	password: yup
		.string()
		.min(5, ErrorMessages.SHORT_PASSWORD)
		.max(20, ErrorMessages.LONG_PASSWORD)
		.matches(passwordRules, { message: ErrorMessages.WEAK_PASSWORD })
		.required(ErrorMessages.FIELD_REQUIRED),
	repeatPassword: yup
		.string()
		.oneOf([yup.ref('password')], ErrorMessages.PASSWORD_DOESNT_MATCH)
		.required(ErrorMessages.FIELD_REQUIRED),
});

export const adminRegisterStep2Schema = yup.object({
	name: yup
		.string()
		.matches(/^[a-zA-Z]+$/, ErrorMessages.INVALID_NAME)
		.required(ErrorMessages.FIELD_REQUIRED),
	country: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	city: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	address: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	restaurantType: yup.string().required(ErrorMessages.FIELD_REQUIRED),
});

export const adminRegisterStep3Schema = yup.object({
	brandName: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	avatar: yup.string().required(ErrorMessages.FIELD_REQUIRED),
});
