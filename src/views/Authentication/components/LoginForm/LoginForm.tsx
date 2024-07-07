import React from 'react';

import { VStack, Img, Text, HStack, Checkbox, Button, useToast, Divider, Icon } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { FiAlertTriangle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { getAccessToken } from '../../../../api/authentication';
import resdyLogoPrimary from '../../../../assets/Resdy.svg';
import { LinkText } from '../../../../common/components/LinkText/LinkText';
import { SuperLink } from '../../../../common/components/SuperLink/SuperLink';
import { NewForm } from '../../../../common/forms/NewForm';
import { getFormikInitialValues } from '../../../../common/utils/getFormikInitialValues';
import { getMyRestaurantThunk } from '../../../../store/restaurant/thunk';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { getCurrentUserThunk } from '../../../../store/user/thunk';
import { FormField } from '../../../../types/form';
import { UserCredentials } from '../../../../types/user';
import { loginSchema as schema } from '../../schemas';

export const LoginForm: React.FC = () => {
	const { userData: user } = useAppSelector((state) => state.user);
	const [error, setError] = React.useState<string | undefined>();

	// Declare hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const toast = useToast();

	const onSubmit = async () => {
		await getAccessToken(values as UserCredentials)
			.then(async (response) => {
				localStorage.setItem('accessToken', response.data.token);
				await dispatch(getCurrentUserThunk());
				console.log('response', response);
				await dispatch(getMyRestaurantThunk());
			})
			.catch((err) => {
				console.error('Authentication failed:', err);
				setError(err.response.data.details.credentials.message);
			});
	};

	const { values, errors, touched, isSubmitting, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: getFormikInitialValues(schema),
		onSubmit,
		validationSchema: schema,
	});

	const fields: FormField[] = [
		{
			id: 'userInfo',
			groupId: 'userInfoGroup',
			type: 'inlineGroup',
			children: [
				{
					id: 'email',
					label: 'Correo electrónico',
					type: 'text',
					value: values['email'],
					error: errors['email'] && touched['email'] && errors['email'],
				},
				{
					id: 'password',
					label: 'Contraseña',
					type: 'password',
					value: values['password'],
					error: errors['password'] && touched['password'] && errors['password'],
				},
			],
		},
	];

	const isFormValid = isValid && !Object.values(values).some((value) => value === '');

	React.useEffect(() => {
		if (user?.data) {
			navigate('/');
			toast({
				position: 'top',
				description: `Has iniciado sesión correctamente, ${user.data?.firstname}`,
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		}
	}, [user]);

	React.useEffect(() => {
		setError(undefined);
	}, [values]);

	return (
		<VStack spacing="1.5rem" align="stretch" w="100%">
			<Img src={resdyLogoPrimary} h="2rem" w="fit-content" />
			<Text textStyle="heading5" fontWeight="bold" color="gray.900">
				Inicia sesión en tu cuenta
			</Text>
			<VStack spacing="1.5rem" align="stretch">
				<Button variant="default-light" size="lg" leftIcon={<FcGoogle />} isDisabled={isSubmitting}>
					Ingresar con Google
				</Button>
				<HStack>
					<Divider />
					<Text textStyle="body1" color="gray.500">
						o
					</Text>
					<Divider />
				</HStack>
				<form id="login" onSubmit={handleSubmit} noValidate>
					<NewForm
						formId="login"
						fields={fields}
						onChange={handleChange}
						onBlur={handleBlur}
						isSubmitting={isSubmitting}
					/>
				</form>
				{error && (
					<HStack w="inherit" alignItems="center">
						<Icon color="red.500" as={FiAlertTriangle} h="100%" />
						<Text color="red.500" w="100%">
							{error}
						</Text>
					</HStack>
				)}
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
						variant="default-light"
						size="lg"
						type="submit"
						form="login"
						isDisabled={!isFormValid}
						isLoading={isSubmitting}
						loadingText={'Ingresando'}
					>
						Ingresar
					</Button>
				</VStack>
			</VStack>
			<HStack justifyContent="center">
				<Text textStyle="body1" color="gray.500">
					¿No tienes cuenta?
				</Text>
				<SuperLink to="/register">
					<LinkText fontWeight="medium">Regístrate</LinkText>
				</SuperLink>
			</HStack>
		</VStack>
	);
};
