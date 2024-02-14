import React from 'react';

import { VStack, Img, Text, Button, Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { FormStepper } from './FormStepper';
import resdyLogoPrimary from '../../../../assets/Resdy.svg';
import { InputErrorMessage } from '../../../../common/components/InputErrorMessage/InputErrorMessage';
import { NewInput } from '../../../../common/components/NewInput/NewInput';
import { NewSelect } from '../../../../common/components/NewSelect/NewSelect';
import { getFormikInitialValues } from '../../../../common/utils/getFormikInitialValues';
import { useAppSelector } from '../../../../store/store';
import { InputConfiguration } from '../../../../types/input';
import { adminRegisterSchema as schema } from '../../schemas';
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

	const getCurrentStepFields = () => {
		const fields: InputConfiguration[] = [
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
			{
				id: 'header_url',
				label: 'Cabecera',
				type: 'text',
			},
		];

		const step0Fields = fields.slice(0, 3);
		const step1Fields = fields.slice(3, 9);
		const step2Fields = fields.slice(9, 12);

		switch (currentStep) {
			case 0:
				return step0Fields;
			case 1:
				return step1Fields;
			case 2:
				return step2Fields;
			default:
				return [];
		}
	};

	const renderFields = () => {
		return getCurrentStepFields().map((field, index) => {
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

	const isFormValid = isValid && !Object.values(values).some((value) => value === '');

	return (
		<React.Fragment>
			<Flex position="absolute" top="3rem" w="-webkit-fill-available" justifyContent="center">
				<Box w={responsiveFormWidth}>
					<FormStepper currentStep={currentStep} />
				</Box>
			</Flex>
			<VStack spacing="1.5rem" align="stretch" w={responsiveFormWidth}>
				<Img src={resdyLogoPrimary} h="2rem" w="fit-content" />
				<VStack spacing="0.5rem" align="stretch">
					<Text textStyle="heading5" fontWeight="bold" color="gray.900">
						Ingresa los datos del administrador
					</Text>
				</VStack>
				<form onSubmit={handleSubmit} noValidate>
					<VStack spacing="1.5rem" align="stretch">
						<Grid templateColumns="repeat(2, 1fr)" columnGap="1.5rem" rowGap="1.5rem">
							{renderFields()}
						</Grid>
						{authError && <InputErrorMessage error={authError} />}
						<VStack spacing="1rem" align="stretch">
							<Button
								variant="solidSecondary"
								size="lg"
								type={currentStep === 2 ? 'submit' : undefined}
								isDisabled={currentStep === 2 && !isFormValid}
								isLoading={isSubmitting}
								loadingText={'Ingresando'}
								onClick={() =>
									setCurrentStep((previousState) => {
										if (previousState === 3) {
											return 0;
										}
										return previousState + 1;
									})
								}
							>
								{currentStep === 2 ? 'Crear restaurante' : 'Continuar'}
							</Button>
						</VStack>
					</VStack>
				</form>
			</VStack>
		</React.Fragment>
	);
};
