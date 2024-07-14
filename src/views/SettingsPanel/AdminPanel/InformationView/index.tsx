import React from 'react';

import { Box, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { updateRestaurant } from '../../../../api/restautants';
import { NewForm } from '../../../../common/forms/NewForm';
import { getMyRestaurantThunk } from '../../../../store/restaurant/thunk';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { FormField } from '../../../../types/form';
import { UpdateRestaurantInput } from '../../../../types/restaurants';
import { updateRestaurantInfoSchema as schema } from '../schemas';

export const InformationView: React.FC = () => {
	const restaurantData = useAppSelector((state) => state.restaurant.restaurantData?.data);

	const toast = useToast();
	const dispatch = useAppDispatch();
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const [editingField, setEditingField] = React.useState<string | undefined>(undefined);

	const handleEditableInputSubmit = async (args: UpdateRestaurantInput) => {
		const input = { ...values, ...args } as UpdateRestaurantInput;

		const filteredInput = Object.fromEntries(
			Object.entries(input).filter(([_, value]) => value !== undefined && value !== null),
		) as UpdateRestaurantInput;

		const finalInput = {
			...filteredInput,
			restaurant_id: restaurantData?.id ?? '',
		};
		setIsSubmitting(true);

		try {
			await updateRestaurant(finalInput);
			toast({
				position: 'top',
				description: 'Información actualizada correctamente.',
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
			dispatch(getMyRestaurantThunk());
		} catch (err) {
			console.error(err);
			toast({
				position: 'top',
				description: 'Ha ocurrido un error al actualizar la información.',
				status: 'error',
				duration: 4000,
				isClosable: true,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const { values, errors, touched, handleBlur, handleChange } = useFormik({
		initialValues: {
			phone: restaurantData?.phone,
			restaurant_type: restaurantData?.restaurant_type,
			city: restaurantData?.city,
			postal_code: restaurantData?.postal_code,
			address: restaurantData?.address,
			description: restaurantData?.description,
			extra_description: restaurantData?.extra_information && restaurantData?.extra_information?.extra_description,
			twitter: restaurantData?.social_media && restaurantData?.social_media.twitter,
			instagram: restaurantData?.social_media && restaurantData?.social_media.instagram,
			tiktok: restaurantData?.social_media && restaurantData?.social_media.tiktok,
			facebook: restaurantData?.social_media && restaurantData?.social_media.facebook,
		},
		onSubmit: () => {},
		validationSchema: schema,
	});

	const fields: FormField[] = [
		{
			id: 'admin_stack_inputs',
			type: 'formStack',
			stack: 'horizontal',
			children: [
				{
					id: 'personal_info',
					groupId: 'personal_info',
					type: 'inlineGroup',
					label: 'Información básica',
					children: [
						{
							id: 'restaurant_type',
							label: 'Tipo de comida',
							description: 'Tipo de comida que sirve tu restaurante.',
							type: 'select',
							value: values.restaurant_type,
							defaultValue: restaurantData?.restaurant_type,
							choices: [
								{ label: 'Española', value: 'Española' },
								{ label: 'Italiana', value: 'Italiana' },
								{ label: 'Mexicana', value: 'Mexicana' },
							],
							isEditable: true,
							error: errors.restaurant_type && touched.restaurant_type ? errors.restaurant_type : undefined,
							isDisabled: !!(editingField && editingField !== 'restaurant_type'),
							dispatcher: setEditingField,
						},
						{
							id: 'country',
							label: 'País',
							description: 'País donde se encuentra el restaurante.',
							type: 'text',
							value: 'España',
							defaultValue: 'España',
							blocked: true,
							isEditable: true,
						},
						{
							id: 'city',
							label: 'Ciudad',
							description: 'Ciudad donde se encuentra tu restaurante.',
							type: 'text',
							value: values.city,
							defaultValue: restaurantData?.city,
							isEditable: true,
							error: errors.city && touched.city ? errors.city : undefined,
							isDisabled: !!(editingField && editingField !== 'city'),
							dispatcher: setEditingField,
						},
						{
							id: 'postal_code',
							label: 'Código postal',
							description: 'Código postal al que pertenece tu restaurante.',
							type: 'text',
							value: values.postal_code,
							defaultValue: restaurantData?.postal_code,
							isEditable: true,
							error: errors.postal_code && touched.postal_code ? errors.postal_code : undefined,
							isDisabled: !!(editingField && editingField !== 'city'),
							dispatcher: setEditingField,
						},
						{
							id: 'address',
							label: 'Dirección',
							description: 'Dirección donde se encuentra tu restaurante.',
							type: 'text',
							value: values.address,
							defaultValue: restaurantData?.address,
							isEditable: true,
							error: errors.address && touched.address ? errors.address : undefined,
							isDisabled: !!(editingField && editingField !== 'address'),
							dispatcher: setEditingField,
						},
						{
							id: 'phone',
							description: 'Tu número de teléfono para poder contactar contigo.',
							label: 'Teléfono',
							type: 'number',
							value: values.phone,
							defaultValue: restaurantData?.phone,
							isEditable: true,
							error: errors.phone && touched.phone ? errors.phone : undefined,
							isDisabled: !!(editingField && editingField !== 'phone'),
							dispatcher: setEditingField,
						},
						{
							id: 'description',
							description: 'Descripción para mostrar en el inicio',
							label: 'Descripción',
							type: 'textarea',
							limit: 500,
							value: values.description,
							defaultValue: restaurantData?.description,
							isEditable: true,
							error: errors.description && touched.description ? errors.description : undefined,
							isDisabled: !!(editingField && editingField !== 'description'),
							dispatcher: setEditingField,
						},
					],
				},
				{
					id: 'additional_info',
					groupId: 'additional_info',
					type: 'inlineGroup',
					label: 'Información adicional',
					children: [
						{
							id: 'extra_description',
							description: 'Se mostrará en la página de inicio como información relevante adicional',
							label: 'Descripción adicional',
							type: 'textarea',
							value: values.extra_description,
							defaultValue: restaurantData?.extra_information?.extra_description,
							isEditable: true,
							// error: errors.extra_info && touched.extra_info ? errors.extra_info : undefined,
							isDisabled: !!(editingField && editingField !== 'extra_info'),
							dispatcher: setEditingField,
						},
						{
							id: 'social_media',
							description: 'Gestiona las cuentas de tu restaurante en diferentes redes sociales',
							label: 'Redes sociales',
							type: 'socialMedia',
							value: {
								twitter: values.twitter,
								instagram: values.instagram,
								tiktok: values.tiktok,
								facebook: values.facebook,
							},
							defaultValue: {
								twitter: restaurantData?.social_media.twitter,
								instagram: restaurantData?.social_media.instagram,
								tiktok: restaurantData?.social_media.tiktok,
								facebook: restaurantData?.social_media.facebook,
							},
							isEditable: true,
							// error: errors.extra_info && touched.extra_info ? errors.extra_info : undefined,
							isDisabled: !!(editingField && editingField !== 'social_media'),
							dispatcher: setEditingField,
						},
					],
				},
			],
		},
	];

	React.useEffect(() => {
		dispatch(getMyRestaurantThunk());
	}, []);

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
