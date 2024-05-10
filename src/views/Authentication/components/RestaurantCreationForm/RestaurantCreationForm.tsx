import React from 'react';

import { VStack, Img, Text, Box, GridItem, Divider, HStack, Button, Grid } from '@chakra-ui/react';
import { useFormik } from 'formik';

import resdyLogoPrimary from '../../../../assets/Resdy.svg';
import { NewInput } from '../../../../common/components/NewInput/NewInput';
import { NewSelect } from '../../../../common/components/NewSelect/NewSelect';
import { getFormikInitialValues } from '../../../../common/utils/getFormikInitialValues';
import { useAppSelector } from '../../../../store/store';
import { InputConfiguration } from '../../../../types/input';
import { adminRegisterStep1Schema as schema } from '../../schemas';
import { responsiveFormWidth } from '../../utils/styles';

export const RestaurantCreationForm: React.FC = () => {
	const { userData: _user, error: authError } = useAppSelector((state) => state.user);

	const [currentStep, setCurrentStep] = React.useState(0);
	const onSubmit = async () => {
		return;
	};

	const { values, errors, touched, isSubmitting, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: getFormikInitialValues(schema),
		onSubmit,
		validationSchema: schema,
	});

	const step1Fields: InputConfiguration[] = [
		{
			id: 'email',
			label: 'Correo electrónico',
			type: 'text',
		},
		{
			id: 'password',
			label: 'Contraseña',
			type: 'password',
		},
		{
			id: 'repeatPassword',
			label: 'Repetir contraseña',
			type: 'password',
		},
	];

	const step2Fields: InputConfiguration[] = [
		{
			id: 'name',
			label: 'Nombre de la página',
			type: 'text',
			tooltip: 'Tooltip de prueba',
		},
		{
			id: 'country',
			label: 'País',
			type: 'select',
			colSpan: 1,
			choices: [
				{
					label: 'España',
					value: 'españa',
				},
			],
		},
		{
			id: 'city',
			label: 'Ciudad',
			type: 'select',
			colSpan: 1,
		},
		{
			id: 'address',
			label: 'Dirección',
			type: 'text',
		},
		{
			id: 'phone',
			label: 'Teléfono',
			type: 'text',
		},
		{
			id: 'restaurant_type',
			label: 'Tipo de cocina',
			type: 'select',
			placeholder: 'Seleccionar',
			choices: [
				{
					label: 'Asiático',
					value: 'asiático',
				},
				{
					label: 'Americano',
					value: 'americano',
				},
			],
		},
	];

	const step3Fields: InputConfiguration[] = [
		{
			id: 'brand_name',
			label: 'Nombre a mostrar en la página web',
			type: 'text',
		},
		{
			id: 'logo_url',
			label: 'Logotipo',
			type: 'text',
		},
	];

	const renderFields = (fields: InputConfiguration[]) => {
		return fields.map((field, index) => {
			switch (field.type) {
				case 'text':
				case 'password':
					return (
						<GridItem colSpan={field.colSpan ?? 2}>
							<NewInput
								key={index}
								label={field.label}
								type={field.type as never}
								id={field.id}
								tooltip={field.tooltip ?? undefined}
								size="md"
								value={values[field.id]}
								error={errors[field.id] && touched[field.id] && errors[field.id]}
								isInvalid={!!(errors[field.id] && touched[field.id])}
								isDisabled={isSubmitting}
								onBlur={handleBlur}
								onChange={handleChange}
							/>
						</GridItem>
					);
				case 'select':
					return (
						<GridItem colSpan={field.colSpan ?? 2}>
							<NewSelect
								key={index}
								label={field.label}
								id={field.id}
								choices={(field.choices ?? []).map((choice) => (
									<option key={choice.value} value={choice.value}>
										{choice.label}
									</option>
								))}
								size="md"
								value={values[field.id]}
								error={errors[field.id] && touched[field.id] && errors[field.id]}
								isInvalid={!!(errors[field.id] && touched[field.id])}
								isDisabled={isSubmitting}
								onBlur={handleBlur}
								onChange={handleChange}
							/>
						</GridItem>
					);
			}
		});
	};

	const renderSteps = () => {
		const steps = [
			{
				title: 'Administrador',
				description: 'Ingresa las credenciales del administrador',
				fields: step1Fields,
			},
			{
				title: 'Restaurante',
				description: 'Información obligatoria sobre tu restaurante',
				fields: step2Fields,
			},
			{
				title: 'Básicos',
				description: 'Información básica opcional sobre tu restaurante',
				fields: step3Fields,
			},
		];
		return (
			<form onSubmit={handleSubmit} noValidate>
				<HStack align="stretch" spacing="2rem">
					{steps.map((step, index) => (
						<React.Fragment key={index}>
							<VStack align="stretch" spacing="1rem" maxW="100%">
								<Text textStyle="heading6">{`${index + 1}. ${step.title}`}</Text>
								<Text textStyle="body1" color="gray.500">
									{step.description}
								</Text>
								<Grid templateColumns="repeat(2, 1fr)" columnGap="1rem" rowGap="1rem">
									{renderFields(step.fields)}
								</Grid>
							</VStack>
							{index + 1 !== steps.length && <Box borderRight="1px solid" color="gray.200" />}
						</React.Fragment>
					))}
				</HStack>
			</form>
		);
	};

	const isFormValid = isValid && !Object.values(values).some((value) => value === '');

	return (
		<React.Fragment>
			<VStack spacing="1.5rem" align="stretch">
				<HStack justifyContent="space-between">
					<Img src={resdyLogoPrimary} h="2rem" w="fit-content" />
					<HStack>
						<Button variant="solidDefault">Volver a inicio</Button>
						<Button variant="solidPrimary">Crear restaurante</Button>
					</HStack>
				</HStack>
				<Divider w="100%" />
				{renderSteps()}
			</VStack>
		</React.Fragment>
	);
};
