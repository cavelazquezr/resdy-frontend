import React from 'react';

import { Avatar, Grid, GridItem, VStack } from '@chakra-ui/react';

import { NewInput } from '../../../common/components/NewInput/NewInput';
import { useAppSelector } from '../../../store/store';
import { InputConfiguration } from '../../../types/input';

export const InformationView: React.FC = () => {
	const userData = useAppSelector((state) => state.user.userData?.data);

	const fields: InputConfiguration[] = [
		{
			id: 'firstname',
			label: 'Nombre',
			type: 'text',
			value: userData?.firstname,
		},
		{
			id: 'lastname',
			label: 'Apellidos',
			type: 'text',
			value: userData?.lastname,
		},
		{
			id: 'phone',
			label: 'Teléfono',
			type: 'text',
		},
		{
			id: 'date_of_birth',
			label: 'Fecha de nacimiento',
			type: 'text',
		},
		{
			id: 'email',
			label: 'Correo electrónico',
			type: 'text',
			colSpan: 2,
			value: userData?.email,
		},
	];
	return (
		<VStack spacing="1rem">
			<Avatar size="xl" />
			<Grid templateColumns="repeat(2, 1fr)" columnGap="2rem" w="100%" rowGap="1rem">
				{fields.map((field, index) => (
					<GridItem key={index} colSpan={field.colSpan ?? 1}>
						<NewInput type={field.type} label={field.label} id={field.id} size="md" defaultValue={field.value ?? ''} />
					</GridItem>
				))}
			</Grid>
		</VStack>
	);
};
