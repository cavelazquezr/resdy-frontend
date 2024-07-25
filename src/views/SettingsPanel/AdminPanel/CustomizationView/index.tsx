import React from 'react';

import { Box, useToast } from '@chakra-ui/react';

import { deleteFile, uploadFiles } from '../../../../api/microservices';
import { updateRestaurant } from '../../../../api/restautants';
import { NewForm } from '../../../../common/forms/NewForm';
import { getMyRestaurantThunk } from '../../../../store/restaurant/thunk';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { IAttachedFile } from '../../../../types';
import { FormField } from '../../../../types/form';

export const CustomizationView: React.FC = () => {
	const userData = useAppSelector((state) => state.user.userData?.data);
	const restaurantData = useAppSelector((state) => state.restaurant.restaurantData?.data);
	const [files, setFiles] = React.useState<File[]>([]);

	const dispatch = useAppDispatch();
	const toast = useToast();
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

	const handleEditableInputSubmit = async () => {
		setIsSubmitting(true);
		if (files && files?.length > 0) {
			const attachedFiles: IAttachedFile[] = Array.from(files).map((file, index) => ({
				id: `restaurants/${restaurantData?.name}/headers/header-${index + 1}`,
				name: `header-${index + 1}`,
				file: file,
				type: file.type,
			}));
			await uploadFiles(attachedFiles);

			const keys = attachedFiles.map((file) => file.id) as string[];

			await updateRestaurant({
				restaurant_id: restaurantData?.id ?? '',
				headers: keys,
			})
				.then(() => {
					toast({
						position: 'top',
						description: `Información actualizada correctamente.`,
						status: 'success',
						duration: 4000,
						isClosable: true,
					});
					dispatch(getMyRestaurantThunk());
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
					if (keys) {
						keys.forEach(async (key) => {
							await deleteFile(key);
						});
					}
				})
				.finally(() => {
					setIsSubmitting(false);
				});
		}
	};

	const fields: FormField[] = [
		{
			id: 'personal_info',
			groupId: 'personal_info',
			type: 'inlineGroup',
			label: 'Personalización básica',
			description: 'Aspectos que puedes modificar en tu plan gratis de Resdy para restaurantes',
			children: [
				{
					id: 'avatar_url',
					description: 'Aparecerá como imagen de perfil en los comentarios que respondas.',
					label: 'Avatar',
					type: 'avatar',
					value: userData?.avatar_url,
					isEditable: true,
				},
				{
					id: 'headers',
					description:
						'Imagenes que aparecerán en la tarjeta y página de tu restaurante. Puedes subir hasta 3 diferentes.',
					label: 'Cabeceras',
					type: 'headers',
					value: restaurantData?.headers ?? [],
					dispatcher: setFiles,
					isEditable: true,
				},
			],
		},
	];

	console.log('isSubmitting', isSubmitting);
	return (
		<Box w="100%" h="100%">
			<form id="customization-info" noValidate>
				<NewForm
					formId="customization-info"
					fields={fields}
					customSubmitHandler={handleEditableInputSubmit}
					isSubmitting={isSubmitting}
				/>
			</form>
		</Box>
	);
};
