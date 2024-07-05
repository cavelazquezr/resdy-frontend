import React from 'react';

import { Button, HStack, Input, InputGroup, useToast } from '@chakra-ui/react';

import { uploadFiles } from '../../../api/microservices';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getCurrentUserThunk } from '../../../store/user/thunk';
import { IAttachedFile } from '../../../types';
import { UserAvatar } from '../UserAvatar/UserAvatar';

interface IProps {
	isDisabled: boolean;
	isSubmitting: boolean;
}

export const UploadAvatarInput: React.FC<IProps> = (props) => {
	const { isDisabled, isSubmitting } = props;
	const [isUploading, setIsUploading] = React.useState<boolean>(false);

	const dispatch = useAppDispatch();
	const toast = useToast();

	const userData = useAppSelector((state) => state.user.userData?.data);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList: FileList | null = e.target.files;
		if (fileList) {
			const attachedFiles: IAttachedFile[] = Array.from(fileList).map((file) => ({
				id: `users/${userData?.id}/${userData?.id}-avatar`,
				name: `${userData?.id}-avatar`,
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
			<UserAvatar avatarPath={userData?.avatar_url} size="md" opacity={isSubmitting ? 0.5 : 1} />
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
