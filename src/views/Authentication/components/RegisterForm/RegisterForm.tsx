import React from 'react';

import { VStack, Img, Text, HStack, Button, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import resdyLogoPrimary from '../../../../assets/Resdy.svg';
import { InputErrorMessage } from '../../../../common/components/InputErrorMessage/InputErrorMessage';
import { NewInput } from '../../../../common/components/NewInput/NewInput';
import { SuperLink } from '../../../../common/components/SuperLink/SuperLink';
import { getFormikInitialValues } from '../../../../common/utils/getFormikInitialValues';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { postNewUserThunk } from '../../../../store/user/thunk';
import { InputConfiguration } from '../../../../types/input';
import { UserCreateInput } from '../../../../types/user';
import { registerSchema as schema } from '../../schemas';

export const RegisterForm: React.FC = () => {
	const { userData: user, error: authError } = useAppSelector((state) => state.user);

	// Declare hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const toast = useToast();

	const onSubmit = async () => {
		const { email, firstname, lastname, password } = values as UserCreateInput;
		const newUser: UserCreateInput = {
			email,
			firstname,
			lastname,
			password,
			is_owner: false,
		};
		await dispatch(postNewUserThunk(newUser));
	};

	const { values, errors, touched, isSubmitting, isValid, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: getFormikInitialValues(schema),
		onSubmit,
		validationSchema: schema,
	});
	const fields: InputConfiguration[] = [
		{
			id: 'firstname',
			label: 'Nombre',
			type: 'text',
		},
		{
			id: 'lastname',
			label: 'Apellidos',
			type: 'text',
		},
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

	const isFormValid = isValid && !Object.values(values).some((value) => value === '');

	React.useEffect(() => {
		if (user?.data && !authError) {
			navigate('/');
			toast({
				position: 'top',
				description: `Has creado tu usuario correctamente, ${user.data?.firstname}`,
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		}
	}, [user, authError]);

	return (
		<VStack spacing="1.5rem" align="stretch">
			<Img src={resdyLogoPrimary} h="2rem" w="fit-content" />
			<VStack spacing="0.5rem" align="stretch">
				<Text textStyle="heading5" fontWeight="bold" color="gray.900">
					Ingresa los datos para crear tu cuenta
				</Text>
			</VStack>
			<form onSubmit={handleSubmit} noValidate>
				<VStack spacing="1.5rem" align="stretch">
					{fields.map((field, index) => (
						<NewInput
							key={index}
							label={field.label}
							type={field.type as 'password' | 'text'}
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
					<VStack spacing="1rem" align="stretch">
						<Button
							variant="default-light"
							size="lg"
							type="submit"
							isDisabled={!isFormValid}
							isLoading={isSubmitting}
							loadingText={'Registrando'}
						>
							Registrar usuario
						</Button>
					</VStack>
				</VStack>
			</form>
			<HStack justifyContent="center">
				<Text textStyle="body1" color="gray.500">
					¿Ya tienes cuenta?
				</Text>
				<SuperLink to="/login">
					<Text textStyle="body1" fontWeight="bold" color="gray.700">
						Ingresa
					</Text>
				</SuperLink>
			</HStack>
		</VStack>
	);
};
