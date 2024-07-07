import * as yup from 'yup';

import { passwordRules } from '../../../../config/standard/passwordRules';
import { ErrorMessages } from '../../../../types/errorMessages';

export const updateUserSchema = yup.object({
	firstname: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	lastname: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	phone: yup.number().required(ErrorMessages.FIELD_REQUIRED),
});

export const changePasswordSchema = yup.object({
	old_password: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	password: yup
		.string()
		.min(5, ErrorMessages.SHORT_PASSWORD)
		.max(20, ErrorMessages.LONG_PASSWORD)
		.matches(passwordRules, { message: ErrorMessages.WEAK_PASSWORD })
		.required(ErrorMessages.FIELD_REQUIRED),
	repeat_password: yup
		.string()
		.oneOf([yup.ref('password')], ErrorMessages.PASSWORD_DOESNT_MATCH)
		.required(ErrorMessages.FIELD_REQUIRED),
});
