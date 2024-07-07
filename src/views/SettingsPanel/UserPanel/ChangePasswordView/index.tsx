/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Button, VStack, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { updateUser } from '../../../../api/authentication';
import { NewForm } from '../../../../common/forms/NewForm';
import { FormField } from '../../../../types/form';
import { changePasswordSchema as schema } from '../schemas';

export const ChangePasswordView: React.FC = () => {
	const toast = useToast();
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const [editingField, setEditingField] = React.useState<string | undefined>(undefined);
	const [customErrors, setCustomErrors] = React.useState<{ [field: string]: string | undefined } | undefined>();

	const handleSubmit = async (event: any) => {
		if (event) event.preventDefault();

		const input = {
			old_password: values.old_password,
			password: values.password,
		};

		console.log('input: ', input);
		setIsSubmitting(true);
		try {
			await updateUser(input).then(() => {
				toast({
					position: 'top',
					description: `Contraseña actualizada correctamente.`,
					status: 'success',
					duration: 4000,
					isClosable: true,
				});
				handleReset(event as any); // Reset the form here
			});
		} catch (error) {
			console.error('Error', error);
			// TODO: Remove any type
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const oldPasswordError = (error as any).response.data.details.old_password;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const passwordError = (error as any).response.data.details.password;
			setCustomErrors({
				old_password: oldPasswordError ? oldPasswordError.message : undefined,
				password: passwordError ? passwordError.message : undefined,
			});
			toast({
				position: 'top',
				description: `Ha ocurrido un error al actualizar la información.`,
				status: 'error',
				duration: 4000,
				isClosable: true,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const { values, errors, touched, isValid, handleBlur, handleChange, handleReset } = useFormik({
		initialValues: {
			old_password: '',
			password: '',
			repeat_password: '',
		},
		onSubmit: handleSubmit,
		validationSchema: schema,
	});

	const oldPasswordError = React.useMemo(() => {
		if (customErrors?.old_password !== undefined) {
			return customErrors.old_password;
		} else {
			return touched.old_password && errors.old_password;
		}
	}, [customErrors, errors.old_password, touched.old_password]);

	const passwordError = React.useMemo(() => {
		if (customErrors?.password !== undefined) {
			return customErrors.password;
		} else {
			return touched.password && errors.password;
		}
	}, [customErrors, errors.password, touched.password]);

	const formIsValid =
		Object.values(values).every((value) => value !== '') &&
		isValid &&
		customErrors?.old_password === undefined &&
		customErrors?.password === undefined;

	React.useEffect(() => {
		if (touched['old_password'] || touched['password']) {
			setCustomErrors(undefined);
		}
	}, [values, touched['old_password'], touched['password']]);

	const fields: FormField[] = [
		{
			id: 'personal_info',
			groupId: 'personal_info',
			type: 'inlineGroup',
			children: [
				{
					id: 'old_password',
					description: 'Introduce tu actual contraseña para poder cambiarla.',
					label: 'Contraseña actual',
					type: 'password',
					value: values?.old_password,
					isEditable: true,
					error: oldPasswordError && touched.old_password ? (oldPasswordError as string) : undefined,
					isDisabled: !!(editingField && editingField !== 'old_password'),
				},
				{
					id: 'password',
					description: 'Introduce tu nueva contraseña.',
					label: 'Nueva contraseña',
					type: 'password',
					value: values.password,
					isEditable: true,
					error: passwordError && touched.password ? (passwordError as string) : undefined,
					isDisabled: !!(editingField && editingField !== 'password'),
					dispatcher: setEditingField,
				},
				{
					id: 'repeat_password',
					description: 'Verifica tu nueva contraseña.',
					label: 'Verificar contraseña',
					type: 'password',
					value: values.repeat_password,
					isEditable: true,
					error: errors.repeat_password && touched.repeat_password ? errors.repeat_password : undefined,
					isDisabled: !!(editingField && editingField !== 'repeat_password'),
					dispatcher: setEditingField,
				},
			],
		},
	];

	return (
		<VStack w="100%" h="100%" align="stretch" spacing="1.5rem">
			<form id="user-info" noValidate>
				<NewForm
					formId="user-info"
					fields={fields}
					onChange={handleChange}
					onBlur={handleBlur}
					isSubmitting={isSubmitting}
				/>
			</form>
			<Button
				variant="primary"
				w="fit-content"
				isDisabled={!formIsValid}
				onClick={async (e) => {
					e.preventDefault();
					await handleSubmit(e);
				}}
			>
				Guardar cambios
			</Button>
		</VStack>
	);
};
