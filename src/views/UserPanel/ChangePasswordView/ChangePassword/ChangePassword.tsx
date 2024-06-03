// import React, { useState } from 'react';

// import {
// 	Divider,
// 	FormControl,
// 	FormLabel,
// 	FormErrorMessage,
// 	FormHelperText,
// 	Input,
// 	Button,
// 	Flex,
// 	Box,
// } from '@chakra-ui/react';

// interface InputConfiguration {
// 	id: string;
// 	label: string;
// 	description: string;
// 	type: 'password' | 'text';
// }
// export const ChangePassword: React.FC = () => {
// 	const fields: InputConfiguration[] = [
// 		{
// 			id: 'password',
// 			label: 'Contraseña actual',
// 			description: 'Debes introducir tu contraseña actual para cambiarla',
// 			type: 'password', // Change this line
// 		},
// 		{
// 			id: 'new-password',
// 			label: 'Nueva contraseña',
// 			description: 'introduce tu nueva contraseña',
// 			type: 'password', // Change this line
// 		},
// 		{
// 			id: 'confirm-password',
// 			description: 'Debes confirma tu nueva contraseña',
// 			label: 'Verificar contraseña',
// 			type: 'password', // Change this line
// 		},
// 	];
// 	const [input, setInput] = useState('');

// 	const isError = input === '';
// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		setInput(e.target.value);
// 	};

// 	return (
// 		<FormControl isInvalid={isError}>
// 			<Flex direction="column" justifyContent="center" gap={4} p={2}>
// 				{fields.map((field) => (
// 					<div key={field.id}>
// 						<Flex justifyContent={'left'} align={'center'} gap={'4em'}>
// 							<Box flexBasis={'30%'}>
// 								<FormLabel>{field.label}</FormLabel>
// 								<FormHelperText>{field.description}</FormHelperText>
// 							</Box>

// 							<Box flexBasis={'35%'}>
// 								<Input type={field.type} onChange={handleInputChange} id={field.id} />
// 								{!isError ? (
// 									<FormHelperText>Enter the email you like to receive the newsletter on.</FormHelperText>
// 								) : (
// 									<FormErrorMessage>Password is required.</FormErrorMessage>
// 								)}
// 							</Box>
// 						</Flex>
// 						<Divider mt={4} />
// 					</div>
// 				))}
// 			</Flex>
// 			<Button mt={4} colorScheme="teal" type="submit">
// 				Guardar cambios
// 			</Button>
// 		</FormControl>
// 	);
// };

import React from 'react';

import {
	Divider,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Button,
	Flex,
	Box,
	Container,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
interface InputConfiguration {
	id: string;
	label: string;
	description: string;
	type: 'password' | 'text';
}

export const ChangePassword: React.FC = () => {
	const fields: InputConfiguration[] = [
		{
			id: 'password',
			label: 'Contraseña actual',
			description: 'Debes introducir tu contraseña actual para cambiarla',
			type: 'password',
		},
		{
			id: 'new-password',
			label: 'Nueva contraseña',
			description: 'Introduce tu nueva contraseña',
			type: 'password',
		},
		{
			id: 'confirm-password',
			description: 'Debes confirmar tu nueva contraseña',
			label: 'Verificar contraseña',
			type: 'password',
		},
	];

	const validate = (values: any) => {
		const errors: any = {};
		if (!values.password) {
			errors.password = 'La contraseña actual es obligatoria';
		}
		if (!values['new-password']) {
			errors['new-password'] = 'La nueva contraseña es obligatoria';
		} else if (values['new-password'].length < 8) {
			errors['new-password'] = 'La nueva contraseña debe tener al menos 8 caracteres';
		}
		if (!values['confirm-password']) {
			errors['confirm-password'] = 'Debes confirmar tu nueva contraseña';
		} else if (values['confirm-password'] !== values['new-password']) {
			errors['confirm-password'] = 'Las contraseñas no coinciden';
		}
		return errors;
	};

	return (
		<Formik
			initialValues={{ password: '', 'new-password': '', 'confirm-password': '' }}
			validate={validate}
			onSubmit={(values) => {
				console.log(values);
			}}
		>
			{({ errors, touched }) => (
				<Form>
					<Flex direction="column" justifyContent="center" gap={4} p={2}>
						{fields.map((field) => (
							<FormControl key={field.id} isInvalid={errors[field.id] && touched[field.id]}>
								<Flex justifyContent={'left'} align={'center'} gap={'4em'}>
									<Box flexBasis={'30%'}>
										<FormLabel htmlFor={field.id}>{field.label}</FormLabel>
										<FormHelperText>{field.description}</FormHelperText>
									</Box>

									<Box flexBasis={'35%'}>
										<Field as={Input} id={field.id} name={field.id} type={field.type} />
										<ErrorMessage name={field.id} component={FormErrorMessage} />
									</Box>
								</Flex>
								<Divider mt={4} />
							</FormControl>
						))}
						<Button mt={4} colorScheme="teal" type="submit" disabled={Object.keys(errors).length > 0} w="10%">
							Guardar cambios
						</Button>
					</Flex>
				</Form>
			)}
		</Formik>
	);
};
