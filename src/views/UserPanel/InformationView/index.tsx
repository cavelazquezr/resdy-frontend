import React from 'react';

import { Divider, VStack } from '@chakra-ui/react';

import { EditableInput } from '../../../common/components/EditableInput/EditableInput';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { updateUserThunk } from '../../../store/user/thunk';
import { InputConfiguration, InputValueType } from '../../../types/input';

export const InformationView: React.FC = () => {
	const userData = useAppSelector((state) => state.user.userData?.data);

	const dispatch = useAppDispatch();

	const handleUpdateInfo = React.useCallback(
		async (id: string, value: InputValueType) => {
			const response = dispatch(updateUserThunk({ [id]: value }));
			return response;
		},
		[userData],
	);

	const [editingField, setEditingField] = React.useState<string | undefined>(undefined);

	const fields: InputConfiguration[] = [
		{
			id: 'avatar_url',
			description: 'Imagen que se mostrará en tu perfil.',
			label: 'Avatar',
			type: 'avatar',
			value: userData?.avatar_url,
		},
		{
			id: 'firstname',
			description: 'Tu nombre que se mostrará en las reservas.',
			label: 'Nombre',
			type: 'text',
			value: userData?.firstname,
		},
		{
			id: 'lastname',
			description: 'Tu apellido que se mostrará en las reservas.',
			label: 'Apellidos',
			type: 'text',
			value: userData?.lastname,
		},
		{
			id: 'email',
			label: 'Correo electrónico',
			description: 'Tu correo electrónico para poder contactar contigo.',
			type: 'text',
			colSpan: 2,
			value: userData?.email,
		},
		{
			id: 'phone',
			description: 'Tu número de teléfono para poder contactar contigo.',
			label: 'Teléfono',
			type: 'number',
			value: userData?.phone,
		},
	];
	return (
		<VStack align="stretch" spacing="1rem" w="100%" h="100%">
			{fields.map((field, index) => (
				<React.Fragment key={index}>
					<EditableInput
						field={field}
						labelingCol={3}
						inputCol={5}
						handleUpdateInfo={handleUpdateInfo}
						isDisabled={!!(editingField && editingField !== field.id)}
						setEditingField={setEditingField}
					/>
					<Divider borderColor="brand-gray.200" />
				</React.Fragment>
			))}
		</VStack>
	);
};
