import React from 'react';

import { Avatar, Button, HStack, Input, InputGroup, useToast } from '@chakra-ui/react';

import { uploadAvatar, uploadFiles } from '../../../api/microservices';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getCurrentUserThunk } from '../../../store/user/thunk';
import { IAttachedFile } from '../../../types';

interface IProps {
	currentAvatar: string;
	isDisabled: boolean;
	isSubmitting: boolean;
}

export const UploadAvatarInput: React.FC<IProps> = (props) => {
	const { currentAvatar, isDisabled, isSubmitting } = props;
	const [isUploading, setIsUploading] = React.useState<boolean>(false);

	const dispatch = useAppDispatch();
	const toast = useToast();

	const userId = useAppSelector((state) => state.user.userData?.data?.id);

	// const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.files && e.target.files.length > 0) {
	// 		const formData = new FormData();
	// 		formData.append('image', e.target.files[0]);
	// 		setIsUploading(true);
	// 		try {
	// 			const response = await uploadAvatar(formData);
	// 			if (response) {
	// 				await dispatch(getCurrentUserThunk());
	// 				toast({
	// 					position: 'top',
	// 					description: `Tu avatar ha sido actualizado correctamente.`,
	// 					status: 'success',
	// 					duration: 4000,
	// 					isClosable: true,
	// 				});
	// 			} else {
	// 				throw new Error('Error updating avatar');
	// 			}
	// 		} catch (error) {
	// 			console.error(error);
	// 		} finally {
	// 			setIsUploading(false);
	// 		}
	// 	}
	// };

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList: FileList | null = e.target.files;
		if (fileList) {
			const attachedFiles: IAttachedFile[] = Array.from(fileList).map((file) => ({
				id: `users/${userId}/${userId}-avatar`,
				name: `${userId}-avatar`,
				file: file,
				type: file.type,
			}));
			setIsUploading(true);
			await uploadFiles(attachedFiles)
				.then(() => {
					dispatch(getCurrentUserThunk());
					toast({
						position: 'top',
						description: `Tu avatar ha sido actualizado correctamente.`,
						status: 'success',
						duration: 4000,
						isClosable: true,
					});
				})
				.catch((error) => {
					console.error(error);
				})
				.finally(() => {
					setIsUploading(false);
				});
		}
	};

	return (
		<HStack>
			<Avatar size="md" src={currentAvatar} opacity={isSubmitting ? 0.5 : 1} />
			<InputGroup>
				<form>
					<label htmlFor="file-upload">
						<Button
							as="span"
							variant="default-light"
							size="sm"
							isDisabled={isDisabled || isUploading}
							isLoading={isUploading}
							loadingText="Subiendo..."
						>
							{isUploading ? 'Subiendo...' : 'Subir'}
						</Button>
						<Input id="file-upload" accept="image/*" type="file" onChange={handleFileChange} hidden />
					</label>
				</form>
			</InputGroup>
		</HStack>
	);
};
