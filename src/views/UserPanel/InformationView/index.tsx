import React from 'react';

import { Box, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { NewForm } from '../../../common/forms/NewForm';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { updateUserThunk } from '../../../store/user/thunk';
import { FormField } from '../../../types/form';
import { UserUpdateInput } from '../../../types/user';
import { updateUserSchema as schema } from '../schemas';

export const InformationView: React.FC = () => {
	const userData = useAppSelector((state) => state.user.userData?.data);

	const dispatch = useAppDispatch();
	const toast = useToast();
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const [editingField, setEditingField] = React.useState<string | undefined>(undefined);

	const handleEditableInputSubmit = async (args: UserUpdateInput) => {
		setIsSubmitting(true);
		await dispatch(updateUserThunk(args as UserUpdateInput))
			.then(() => {
				toast({
					position: 'top',
					description: `Información actualizada correctamente.`,
					status: 'success',
					duration: 4000,
					isClosable: true,
				});
			})
			.catch((err) => {
				console.error(err);
				toast({
					position: 'top',
					description: `Ha ocurrido un error al actualizar la información.`,
					status: 'error',
					duration: 4000,
					isClosable: true,
				});
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	const { values, errors, touched, handleBlur, handleChange } = useFormik({
		initialValues: {
			firstname: userData?.firstname,
			lastname: userData?.lastname,
			phone: userData?.phone,
		},
		onSubmit: handleEditableInputSubmit,
		validationSchema: schema,
	});

	const fields: FormField[] = [
		{
			id: 'personal_info',
			groupId: 'personal_info',
			type: 'inlineGroup',
			children: [
				{
					id: 'avatar_url',
					description: 'Imagen que se mostrará en tu perfil.',
					label: 'Avatar',
					type: 'avatar',
					value: userData?.avatar_url,
					isEditable: true,
					isDisabled: !!(editingField && editingField !== 'avatar_url'),
				},
				{
					id: 'firstname',
					description: 'Tu nombre que se mostrará en las reservas.',
					label: 'Nombre',
					type: 'text',
					value: values.firstname,
					defaultValue: userData?.firstname,
					isEditable: true,
					error: errors.firstname && touched.firstname ? errors.firstname : undefined,
					isDisabled: !!(editingField && editingField !== 'firstname'),
					dispatcher: setEditingField,
				},
				{
					id: 'lastname',
					description: 'Tu apellido que se mostrará en las reservas.',
					label: 'Apellidos',
					type: 'text',
					value: values.lastname,
					defaultValue: userData?.lastname,
					isEditable: true,
					error: errors.lastname && touched.lastname ? errors.lastname : undefined,
					isDisabled: !!(editingField && editingField !== 'lastname'),
					dispatcher: setEditingField,
				},
				{
					id: 'email',
					label: 'Correo electrónico',
					description: 'Tu correo electrónico para poder contactar contigo.',
					type: 'text',
					colSpan: 2,
					value: userData?.email,
					blocked: true,
					isEditable: true,
				},
				{
					id: 'phone',
					description: 'Tu número de teléfono para poder contactar contigo.',
					label: 'Teléfono',
					type: 'number',
					value: values.phone,
					defaultValue: userData?.phone,
					isEditable: true,
					error: errors.phone && touched.phone ? errors.phone : undefined,
					isDisabled: !!(editingField && editingField !== 'phone'),
					dispatcher: setEditingField,
				},
			],
		},
	];

	return (
		<Box w="100%" h="100%">
			<form id="user-info" noValidate>
				<NewForm
					formId="user-info"
					fields={fields}
					customSubmitHandler={handleEditableInputSubmit}
					onChange={handleChange}
					onBlur={handleBlur}
					isSubmitting={isSubmitting}
				/>
			</form>
		</Box>
	);
};
