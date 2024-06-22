/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { VStack, Img, Divider, HStack, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';

import { getAddressOptions } from '../../../../api/mapbox';
import resdyLogoPrimary from '../../../../assets/Resdy.svg';
import { NewForm } from '../../../../common/forms/NewForm';
import { FormField } from '../../../../types/form';
import { RestaurantCreateInput } from '../../../../types/restaurants';
import { adminRegisterSchema as schema } from '../../schemas';

export const RestaurantCreationForm: React.FC = () => {
	const onSubmit = () => {
		console.log('submit');
	};
	const { values, errors, touched, isSubmitting, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: {
			email: '',
			password: '',
			repeat_password: '',
			name: '',
			city: '',
			postal_code: '',
			address: '',
			country: 'España',
			phone: '',
			restaurant_type: '',
			brand_name: '',
		},
		onSubmit,
		validationSchema: schema,
	});

	const formValues = values as RestaurantCreateInput & { repeat_password: string };

	const addressOptionsQuery = useQuery({
		queryKey: ['addressOptionsQuery', formValues.city, formValues.address, formValues.country],
		queryFn: () =>
			getAddressOptions({
				city: formValues.city,
				address: formValues.address,
				country: formValues.country,
				postal_code: formValues.postal_code,
			}),
		enabled: !!formValues.address,
	});

	const addressOptions = React.useMemo<FormField['choices']>(() => {
		if (addressOptionsQuery.data) {
			return addressOptionsQuery.data;
		}
		return [];
	}, [addressOptionsQuery]);

	console.log('formValues', formValues);

	const firstStepValidated: boolean = !!(
		!errors['email'] &&
		!errors['password'] &&
		!errors['repeat_password'] &&
		touched['email'] &&
		touched['password'] &&
		touched['repeat_password']
	);

	const secondStepValidated: boolean = !!(
		firstStepValidated &&
		!errors['name'] &&
		!errors['city'] &&
		!errors['country'] &&
		!errors['postal_code'] &&
		!errors['address'] &&
		!errors['phone'] &&
		!errors['restaurant_type'] &&
		touched['name'] &&
		touched['city'] &&
		touched['postal_code'] &&
		touched['address'] &&
		touched['phone']
	);

	const formFields: Array<FormField> = [
		{
			id: 'adminInfo',
			groupId: 'adminInfoGroup',
			type: 'inlineGroup',
			label: '1. Administrador',
			description: 'Ingresa los datos de la cuenta administradora',
			children: [
				{
					id: 'email',
					label: 'Correo electrónico',
					type: 'text',
					colSpan: 2,
					value: formValues.email,
					//TODO: Fix this any type
					error: !!(errors['email'] && touched['email']) && (errors['email'] as any),
				},
				{
					id: 'password',
					label: 'Contraseña',
					type: 'password',
					colSpan: 2,
					value: formValues.password,
					//TODO: Fix this any type
					error: errors['password'] && touched['password'] && (errors['password'] as any),
				},
				{
					id: 'repeat_password',
					label: 'Repetir contraseña',
					type: 'password',
					colSpan: 2,
					value: formValues.repeat_password,
					//TODO: Fix this any type
					error: errors['repeat_password'] && touched['repeat_password'] && (errors['repeat_password'] as any),
				},
			],
		},
		{
			id: 'restaurantInfo',
			groupId: 'restaurantInfoGroup',
			type: 'inlineGroup',
			label: '2. Restaurante',
			description: 'Información obligatoria sobre tu restaurante',
			isDisabled: !firstStepValidated,
			children: [
				{
					id: 'name',
					label: 'Nombre de la página',
					type: 'text',
					colSpan: 2,
					value: formValues.name,
					//TODO: Fix this any type
					error: errors['name'] && touched['name'] && (errors['name'] as any),
				},
				{
					id: 'country',
					label: 'País',
					type: 'select',
					choices: [{ label: 'España', value: 'España' }],
					colSpan: 1,
					value: formValues.country,
					isDisabled: true,
					//TODO: Fix this any type
					error: errors['country'] && touched['country'] && (errors['country'] as any),
				},
				{
					id: 'city',
					label: 'Ciudad',
					type: 'text',
					colSpan: 1,
					value: formValues.city,
					//TODO: Fix this any type
					error: errors['city'] && touched['city'] && (errors['city'] as any),
				},
				{
					id: 'postal_code',
					label: 'Código postal',
					type: 'text',
					colSpan: 1,
					value: formValues.postal_code,
					//TODO: Fix this any type
					error: errors['postal_code'] && touched['postal_code'] && (errors['postal_code'] as any),
				},
				{
					id: 'address',
					label: 'Dirección',
					type: 'text',
					choices: addressOptions,
					colSpan: 2,
					value: formValues.address,
					//TODO: Fix this any type
					error: errors['address'] && touched['address'] && (errors['address'] as any),
				},
				{
					id: 'phone',
					label: 'Teléfono',
					type: 'text',
					colSpan: 2,
					value: formValues.phone,
					//TODO: Fix this any type
					error: errors['phone'] && touched['phone'] && (errors['phone'] as any),
				},
				{
					id: 'restaurant_type',
					label: 'Tipo de cocina',
					type: 'select',
					placeholder: 'Selecciona el tipo de cocina',
					choices: [
						{ label: 'Española', value: 'Española' },
						{ label: 'Italiana', value: 'Italiana' },
						{ label: 'Mexicana', value: 'Mexicana' },
					],
					value: formValues.restaurant_type,
					//TODO: Fix this any type
					error: errors['restaurant_type'] && touched['restaurant_type'] && (errors['restaurant_type'] as any),
				},
			],
		},
		{
			id: 'basicInfo',
			groupId: 'basicInfoGroup',
			type: 'inlineGroup',
			label: '3. Básicos',
			description: 'Información básica opcional sobre tu restaurante',
			isDisabled: !secondStepValidated,
			children: [
				{
					id: 'brand_name',
					label: 'Nombre a mostrar en la página',
					type: 'text',
					colSpan: 2,
					value: formValues.brand_name,
					//TODO: Fix this any type
					error: errors['brand_name'] && touched['brand_name'] && (errors['brand_name'] as any),
				},
				{
					id: 'header',
					label: 'logo',
					type: 'dragAndDrop',
					colSpan: 2,
				},
			],
		},
	];

	return (
		<React.Fragment>
			<VStack spacing="1.5rem" align="stretch">
				<HStack justifyContent="space-between">
					<Img src={resdyLogoPrimary} h="2rem" w="fit-content" />
					<HStack>
						<Button variant="default-light">Volver a inicio</Button>
						<Button variant="primary">Crear restaurante</Button>
					</HStack>
				</HStack>
				<Divider w="100%" />
				<HStack spacing="2rem" align="start">
					{formFields.map((field, index) => (
						<NewForm key={index} fields={[field]} onChange={handleChange} onBlur={handleBlur} />
					))}
				</HStack>
			</VStack>
		</React.Fragment>
	);
};
