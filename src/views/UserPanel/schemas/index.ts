import * as yup from 'yup';

import { ErrorMessages } from '../../../types/errorMessages';

export const updateUserSchema = yup.object({
	firstname: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	lastname: yup.string().required(ErrorMessages.FIELD_REQUIRED),
	phone: yup.number().required(ErrorMessages.FIELD_REQUIRED),
});
