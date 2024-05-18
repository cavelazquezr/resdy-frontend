import * as yup from 'yup';

import { ErrorMessages } from '../../../../types/errorMessages';

const spanishPhoneNumberRegex = /^(6|7|8|9)\d{8}$/;

export const updateProfileDataSchema = yup.object({
	firstname: yup.string().max(20, ErrorMessages.LONG_NAME).required(ErrorMessages.FIELD_REQUIRED),
	lastname: yup.string().max(20, ErrorMessages.LONG_NAME).required(ErrorMessages.FIELD_REQUIRED),
	phone: yup
		.string()
		.matches(spanishPhoneNumberRegex, ErrorMessages.INVALID_PHONE)
		.required(ErrorMessages.FIELD_REQUIRED),
});
