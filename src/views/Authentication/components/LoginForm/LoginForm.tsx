import React from 'react';

import { VStack, Img, Text, HStack, Checkbox, Button, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import resdyLogoPrimary from '../../../../assets/Resdy.svg';
import { InputErrorMessage } from '../../../../common/components/InputErrorMessage/InputErrorMessage';
import { NewInput } from '../../../../common/components/NewInput/NewInput';
import { SuperLink } from '../../../../common/components/SuperLink/SuperLink';
import { getFormikInitialValues } from '../../../../common/utils/getFormikInitialValues';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { getAccessTokenThunk } from '../../../../store/user/thunk';
import { InputConfiguration } from '../../../../types/input';
import { UserCredentials } from '../../../../types/user';
import { loginSchema as schema } from '../../schemas';
import { responsiveFormWidth } from '../../utils/styles';

export const LoginForm: React.FC = () => {
	const { userData: user, error: authError } = useAppSelector((state) => state.user);

	// Declare hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const toast = useToast();

	const onSubmit = async () => {
		await dispatch(getAccessTokenThunk(values as UserCredentials));
	};

	const { values, errors, touched, isSubmitting, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: getFormikInitialValues(schema),
		onSubmit,
		validationSchema: schema,
	});

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
	];

	const isFormValid = isValid && !Object.values(values).some((value) => value === '');

	React.useEffect(() => {
		if (user?.data && !authError) {
			navigate('/');
			toast({
				position: 'top',
				description: `Has iniciado sesión correctamente, ${user.data?.firstname}`,
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		}
	}, [user, authError]);

	return (
		<VStack spacing="1.5rem" align="stretch" w={responsiveFormWidth}>
			<Img src={resdyLogoPrimary} h="2rem" w="fit-content" />
			<VStack spacing="0.5rem" align="stretch">
				<Text textStyle="heading5" fontWeight="bold" color="gray.900">
					Inicia sesión en tu cuenta
				</Text>
			</VStack>
			<form onSubmit={handleSubmit} noValidate>
				<VStack spacing="1.5rem" align="stretch">
					{fields.map((field, index) => (
						<NewInput
							key={index}
							label={field.label}
							type={field.type as 'text' | 'password'}
							id={field.id}
							size="md"
							value={values[field.id]}
							error={errors[field.id] && touched[field.id] && errors[field.id]}
							isInvalid={!!(errors[field.id] && touched[field.id])}
							isDisabled={isSubmitting}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					))}
					{authError && <InputErrorMessage error={authError} />}
					<HStack justifyContent="space-between">
						<Checkbox
							size="md"
							colorScheme="brand-primary"
							id="remember"
							value={values['remember']}
							isDisabled={isSubmitting}
							onChange={handleChange}
						>
							Recuérdame
						</Checkbox>
						<Text textStyle="body1" fontWeight="bold" color="gray.700">
							¿No recuerdas la contraseña?
						</Text>
					</HStack>
					<VStack spacing="1rem" align="stretch">
						<Button
							variant="solidPrimary"
							size="lg"
							type="submit"
							isDisabled={!isFormValid}
							isLoading={isSubmitting}
							loadingText={'Ingresando'}
						>
							Ingresar
						</Button>
						<Button variant="outlineDefault" size="lg" leftIcon={<FcGoogle />} isDisabled={isSubmitting}>
							Ingresar con Google
						</Button>
					</VStack>
				</VStack>
			</form>
			<HStack justifyContent="center">
				<Text textStyle="body1" color="gray.500">
					¿No tienes cuenta?
				</Text>
				<SuperLink to="/register">
					<Text textStyle="body1" fontWeight="bold" color="gray.700">
						Regístrate
					</Text>
				</SuperLink>
			</HStack>
		</VStack>
	);
};
