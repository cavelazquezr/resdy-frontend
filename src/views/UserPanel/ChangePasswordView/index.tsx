import { useState } from 'react';

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
	useToast,
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
	newPassword?: string;
	confirmPassword?: string;
}

const validateChangePassword = (values: FormErrors) => {
	const minCharactersInNewPassword = 6;
	const errors: FormErrors = {};
	if (!values.password) {
		errors.password = 'La contraseña actual es obligatoria';
	}
	if (!values['newPassword']) {
		errors['newPassword'] = 'La nueva contraseña es obligatoria';
	} else if (values['newPassword'].length < minCharactersInNewPassword) {
		errors['newPassword'] =
			'La contraseña no es lo suficientemente segura. La contraseña debe tener por lo menos 6 caracteres';
	}
	if (!values['confirmPassword']) {
		errors['confirmPassword'] = 'Debes confirmar tu nueva contraseña';
	} else if (values['confirmPassword'] !== values['newPassword']) {
		errors['confirmPassword'] = 'Las contraseñas no coinciden';
	}
	return errors;
};

export const ChangePasswordView: React.FC = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const toast = useToast();
	const fields: InputConfiguration[] = [
		{
			id: 'password',
			label: 'Contraseña actual',
			description: 'Debes introducir tu contraseña actual para cambiarla',
			type: 'password',
		},
		{
			id: 'newPassword',
			label: 'Nueva contraseña',
			description: 'Introduce tu nueva contraseña',
			type: 'password',
		},
		{
			id: 'confirmPassword',
			description: 'Debes confirmar tu nueva contraseña',
			label: 'Verificar contraseña',
			type: 'password',
		},
	];

	return (
		<Formik
			initialValues={{ password: '', newPassword: '', confirmPassword: '' }}
			validate={validateChangePassword}
			onSubmit={async (values, actions) => {
				try {
					setIsSubmitting(true);
					await updateUser({ password: values['newPassword'], old_password: values['password'] });
					actions.resetForm();
					toast({
						position: 'top',
						description: `Tu clave ha sido actualizada correctamente.`,
						status: 'success',
						duration: 4000,
						isClosable: true,
					});
					setIsSubmitting(false);
				} catch (error) {
					//add error message to toast
					toast({
						position: 'top',
						description: `Ha habido un error al actualizar tu clave verifica tus contraseñas. intenta de nuevo`,
						status: 'error',
						duration: 4000,
						isClosable: true,
					});
					setIsSubmitting(false);
				}
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
							p={4}
							colorScheme="teal"
							opacity={Object.keys(errors).length > 0 ? 0.5 : 1}
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
