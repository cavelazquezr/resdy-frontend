import React, { useState } from 'react';

import {
	Divider,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Button,
	Flex,
	Box,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { updateUser } from 'api/authentication';
interface InputConfiguration {
	id: string;
	label: string;
	description: string;
	type: 'password' | 'text';
}
interface FormErrors {
	password?: string;
	'new-password'?: string;
	'confirm-password'?: string;
}
export const ChangePassword: React.FC = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const fields: InputConfiguration[] = [
		{
			id: 'password',
			label: 'Contraseña actual',
			description: 'Debes introducir tu contraseña actual para cambiarla',
			type: 'password',
		},
		{
			id: 'new-password',
			label: 'Nueva contraseña',
			description: 'Introduce tu nueva contraseña',
			type: 'password',
		},
		{
			id: 'confirm-password',
			description: 'Debes confirmar tu nueva contraseña',
			label: 'Verificar contraseña',
			type: 'password',
		},
	];

	const validate = (values: FormErrors) => {
		const errors: FormErrors = {};
		if (!values.password) {
			errors.password = 'La contraseña actual es obligatoria';
		}
		if (!values['new-password']) {
			errors['new-password'] = 'La nueva contraseña es obligatoria';
		} else if (values['new-password'].length < 6) {
			errors['new-password'] =
				'La contraseña no es lo suficientemente segura. La contraseña debe tener por lo menos 10 caracteres';
		}
		if (!values['confirm-password']) {
			errors['confirm-password'] = 'Debes confirmar tu nueva contraseña';
		} else if (values['confirm-password'] !== values['new-password']) {
			errors['confirm-password'] = 'Las contraseñas no coinciden';
		}
		return errors;
	};

	return (
		<Formik
			initialValues={{ password: '', 'new-password': '', 'confirm-password': '' }}
			validate={validate}
			onSubmit={async (values, actions) => {
				setIsSubmitting(true);
				await updateUser({ password: values['new-password'] });
				actions.resetForm();
				setIsSubmitting(false);
			}}
		>
			{({ errors, touched }) => (
				<Form>
					<Flex direction="column" justifyContent="center" gap={4} p={2}>
						{fields.map((field) => (
							<FormControl key={field.id} isInvalid={errors[field.id] && touched[field.id]}>
								<Flex justifyContent={'left'} align={'center'} gap={'4em'}>
									<Box flexBasis={'30%'}>
										<FormLabel htmlFor={field.id}>{field.label}</FormLabel>
										<FormHelperText>{field.description}</FormHelperText>
									</Box>

									<Box flexBasis={'35%'}>
										<Field as={Input} id={field.id} name={field.id} type={field.type} />
										<ErrorMessage name={field.id} component={FormErrorMessage} />
									</Box>
								</Flex>
								<Divider mt={4} />
							</FormControl>
						))}
						<Button
							mt={4}
							colorScheme="teal"
							type="submit"
							isLoading={isSubmitting}
							disabled={Object.keys(errors).length > 0 && isSubmitting}
							w="10%"
						>
							Guardar cambios
						</Button>
					</Flex>
				</Form>
			)}
		</Formik>
	);
};
