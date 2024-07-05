/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { VStack, Img, Divider, HStack, Button, useDisclosure, useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { getAddressOptions } from '../../../../api/mapbox';
import { deleteFile, uploadFiles } from '../../../../api/microservices';
import { createRestaurant } from '../../../../api/restautants';
import { checkIfEmailIsUsed, checkIfRestaurantNameIsUsed } from '../../../../api/verification';
import resdyLogoPrimary from '../../../../assets/Resdy.svg';
import { MessageModal } from '../../../../common/components/MessageModal/MessageModal';
import { NewForm } from '../../../../common/forms/NewForm';
import { useAppDispatch } from '../../../../store/store';
import { getCurrentUserThunk } from '../../../../store/user/thunk';
import { IAttachedFile } from '../../../../types';
import { FormField } from '../../../../types/form';
import { RestaurantCreateInput } from '../../../../types/restaurants';
import { adminRegisterSchema as schema } from '../../schemas';

export const RestaurantCreationForm: React.FC = () => {
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const [files, setFiles] = React.useState<FileList>();
	const [customErrors, setCustomErrors] = React.useState<{ [field: string]: string | undefined } | undefined>();

	const {
		isOpen: isMessageModalOpen,
		onOpen: onMessageModalOpen,
		onClose: onMessageModalClose,
		onToggle: onMessageModalToggle,
	} = useDisclosure();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const toast = useToast();

	const onSubmit = async () => {
		setIsSubmitting(true);

		const input: RestaurantCreateInput = {
			email: values.email,
			password: values.password,
			avatar_url: `restaurants/${values.name}/${values.name}-logo`,
			name: values.name,
			city: values.city,
			postal_code: values.postal_code,
			address: values.address,
			country: values.country,
			phone: values.phone,
			restaurant_type: values.restaurant_type,
			brand_name: values.brand_name,
		};
		if (files && files?.length > 0) {
			const attachedFiles: IAttachedFile[] = Array.from(files).map((file) => ({
				id: input.avatar_url ?? `restaurants/${values.name}/${values.name}-logo`,
				name: `${input.name}-logo`,
				file: file,
				type: file.type,
			}));
			await uploadFiles(attachedFiles);
		}
		await createRestaurant(input)
			.then((response) => {
				const token = response.data.token;
				localStorage.setItem('accessToken', token);
				dispatch(getCurrentUserThunk());
				onMessageModalOpen();
			})
			.catch(async (error) => {
				const errorMessage = error.response.data.message;
				toast({
					position: 'top',
					description: errorMessage,
					status: 'error',
					duration: 4000,
					isClosable: true,
				});
				if (files) {
					await deleteFile(input.avatar_url ?? `restaurants/${values.name}/${values.name}-logo`);
				}
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
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

	const firstStepValidated = isFirstStepValid(errors, touched) && !customErrors?.email;
	const secondStepValidated = isSecondStepValid(errors, touched, firstStepValidated);

	const handleEmailCheck = React.useCallback(async () => {
		if (values['email']) {
			await checkIfEmailIsUsed({ email: values['email'] })
				.then((res) => {
					if (res.data === true) {
						setCustomErrors({ email: undefined });
					}
				})
				.catch((error) => {
					const message = error.response.data.message;
					setCustomErrors({ email: message });
				});
		}
	}, [values['email'], errors['email'], touched['email']]);

	const handleRestaurantNameCheck = React.useCallback(async () => {
		if (values['email']) {
			await checkIfRestaurantNameIsUsed({ name: values['name'] })
				.then((res) => {
					if (res.data === true) {
						setCustomErrors({ name: undefined });
					}
				})
				.catch((error) => {
					const message = error.response.data.message;
					setCustomErrors({ name: message });
				});
		}
	}, [values['name'], errors['name'], touched['name']]);

	React.useEffect(() => {
		if (touched['email']) {
			handleEmailCheck();
		}
	}, [values['email'], errors['email'], touched['email']]);

	React.useEffect(() => {
		if (touched['name']) {
			handleRestaurantNameCheck();
		}
	}, [values['name'], errors['name'], touched['name']]);

	const emailError = React.useMemo(() => {
		if (customErrors?.email !== undefined) {
			return customErrors.email;
		} else {
			return touched['email'] && errors.email;
		}
	}, [customErrors, errors.email, touched.email]);

	const nameError = React.useMemo(() => {
		if (customErrors?.name !== undefined) {
			return customErrors.name;
		} else {
			return touched['name'] && errors.name;
		}
	}, [customErrors, errors.name, touched.name]);

	const formFields: Array<FormField> = [
		{
			id: 'restaurantCreationForm',
			type: 'formStack',
			label: 'Registro de restaurante',
			stack: 'horizontal',
			isDisabled: isSubmitting,
			children: [
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
							// Use the custom error if present, otherwise fallback to Formik error
							error: emailError as any,
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
							error: nameError as any,
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
							label: 'Logo',
							type: 'dragAndDrop',
							isDisabled: !secondStepValidated,
							colSpan: 2,
							dispatcher: setFiles,
						},
					],
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
						<Button variant="default-light" isDisabled={isSubmitting} onClick={() => navigate('/')}>
							Volver al inicio
						</Button>
						<Button
							variant="primary"
							type="submit"
							form="create-restaurant"
							isDisabled={!secondStepValidated || isSubmitting}
							isLoading={isSubmitting}
							loadingText="Creando restaurante"
						>
							Crear restaurante
						</Button>
					</HStack>
				</HStack>
				<Divider w="100%" />
				<HStack spacing="2rem" align="start">
					<form id="create-restaurant" onSubmit={handleSubmit} noValidate>
						<NewForm fields={formFields} onChange={handleChange} onBlur={handleBlur} isSubmitting={isSubmitting} />
					</form>
				</HStack>
			</VStack>
			<MessageModal
				isOpen={isMessageModalOpen}
				onClose={onMessageModalClose}
				handleToggle={onMessageModalToggle}
				title="¡Restaurante creado!"
				// eslint-disable-next-line max-len
				bodyText="Puedes volver a la pantalla de inicio o itestr al panel de administración para seguir configurando tu restaurante."
				firstActionButton={{
					title: 'Ir al panel de administración',
					action: () => {
						navigate('/userpanel/information');
						onMessageModalClose();
					},
				}}
				secondActionButton={{
					title: 'Volver al inicio',
					action: () => {
						navigate('/');
						onMessageModalClose();
					},
				}}
			/>
		</React.Fragment>
	);
};

const isFirstStepValid = (errors: any, touched: any): boolean => {
	return !!(
		!errors['email'] &&
		!errors['password'] &&
		!errors['repeat_password'] &&
		touched['email'] &&
		touched['password'] &&
		touched['repeat_password']
	);
};

const isSecondStepValid = (errors: any, touched: any, isFirstStepValid: boolean): boolean => {
	return !!(
		isFirstStepValid &&
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
};
