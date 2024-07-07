import React from 'react';

import { VStack, Img, Text, HStack, Button, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { checkIfEmailIsUsed } from '../../../../api/verification';
import resdyLogoPrimary from '../../../../assets/Resdy.svg';
import { LinkText } from '../../../../common/components/LinkText/LinkText';
import { SuperLink } from '../../../../common/components/SuperLink/SuperLink';
import { NewForm } from '../../../../common/forms/NewForm';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { postNewUserThunk } from '../../../../store/user/thunk';
import { FormField } from '../../../../types/form';
import { UserCreateInput } from '../../../../types/user';
import { registerSchema as schema } from '../../schemas';

export const RegisterForm: React.FC = () => {
	const { userData: user } = useAppSelector((state) => state.user);
	const [customErrors, setCustomErrors] = React.useState<{ [field: string]: string | undefined } | undefined>();

	// Declare hooks
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const toast = useToast();

	const onSubmit = async () => {
		const { email, firstname, lastname, password } = values as Omit<UserCreateInput, 'is_owner'>;
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
		initialValues: {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			repeat_password: '',
		},
		onSubmit,
		validationSchema: schema,
	});

	const isFormValid =
		!Object.values(values).every((value) => value === '') && isValid && customErrors?.email === undefined;

	React.useEffect(() => {
		if (user?.data) {
			navigate('/');
			toast({
				position: 'top',
				description: `Has creado tu usuario correctamente, ${user.data?.firstname}`,
				status: 'success',
				duration: 4000,
				isClosable: true,
			});
		}
	}, [user]);

	const handleEmailCheck = React.useCallback(async () => {
		if (values['email']) {
			await checkIfEmailIsUsed({ email: values['email'] })
				.then((res) => {
					if (res.data === true) {
						setCustomErrors({ email: undefined });
					}
				})
				.catch((error) => {
					const message = error.response.data.details.email.message;
					setCustomErrors({ email: message });
				});
		}
	}, [values['email'], errors['email'], touched['email']]);

	React.useEffect(() => {
		if (touched['email']) {
			handleEmailCheck();
		}
	}, [values['email'], errors['email'], touched['email']]);

	const emailError = React.useMemo(() => {
		if (customErrors?.email !== undefined) {
			return customErrors.email;
		} else {
			return touched['email'] && errors.email;
		}
	}, [customErrors, errors.email, touched.email]);

	const fields: FormField[] = [
		{
			id: 'userInfo',
			groupId: 'userInfoGroup',
			type: 'inlineGroup',
			isDisabled: isSubmitting,
			children: [
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
					value: values.email,
					isRequired: true,
					// Use the custom error if present, otherwise fallback to Formik error
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					error: emailError && touched.email ? (emailError as string) : undefined,
				},
				{
					id: 'password',
					label: 'Contraseña',
					type: 'password',
					isRequired: true,
					error: errors.password && touched.password ? errors.password : undefined,
				},
				{
					id: 'repeat_password',
					label: 'Repetir contraseña',
					type: 'password',
					isRequired: true,
					error: errors.repeat_password && touched.repeat_password ? errors.repeat_password : undefined,
				},
			],
		},
	];

	return (
		<VStack spacing="1.5rem" align="stretch" w="100%">
			<Img src={resdyLogoPrimary} h="2rem" w="fit-content" />
			<VStack spacing="0.5rem" align="stretch">
				<Text textStyle="heading5" fontWeight="bold" color="gray.900">
					Ingresa los datos para crear tu cuenta
				</Text>
			</VStack>
			<form id="create-user" onSubmit={handleSubmit} noValidate>
				<NewForm fields={fields} onChange={handleChange} onBlur={handleBlur} isSubmitting={isSubmitting} />
			</form>
			<VStack spacing="1rem" align="stretch">
				<Button
					variant="default-light"
					size="lg"
					type="submit"
					form="create-user"
					isDisabled={!isFormValid}
					isLoading={isSubmitting}
					loadingText={'Registrando'}
				>
					Registrar usuario
				</Button>
			</VStack>

			<HStack justifyContent="center">
				<Text textStyle="body1" color="gray.500">
					¿Ya tienes cuenta?
				</Text>
				<SuperLink to="/login">
					<LinkText fontWeight="medium">Ingresa</LinkText>
				</SuperLink>
			</HStack>
		</VStack>
	);
};
