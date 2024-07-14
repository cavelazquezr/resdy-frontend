import React from 'react';

import { Box, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';

import { ContentContainer } from '../../../components/ContentContainer/ContentContainer';
import { formatFileSize } from '../../../utils/formatFileSize';

interface IProps {
	file: File;
	isDisabled?: boolean;
	onDelete: () => void;
}

export const FilePreview: React.FC<IProps> = (props) => {
	const { file, isDisabled, onDelete } = props;
	const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (file && file.type.startsWith('image/')) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);

			return () => URL.revokeObjectURL(url);
		} else {
			setPreviewUrl(null);
		}
	}, [file]);

	return (
		<ContentContainer opacity={isDisabled ? '0.5' : undefined} maxW="25rem">
			<HStack spacing="1rem" w="100%" justifyContent="space-between" alignItems="center">
				<HStack align="start" spacing="1rem" alignItems="center">
					{previewUrl ? (
						<Image src={previewUrl} w="5rem" h="5rem" objectFit="cover" alt={file.name} borderRadius="0.5rem" />
					) : (
						<Box bg="gray.200" w="5rem" h="5rem" display="flex" alignItems="center" justifyContent="center"></Box>
					)}
					<VStack align="start">
						<Text color="gray.900" textStyle="body1" fontWeight="medium">
							{file.name}
						</Text>
						<HStack>
							<Text color="gray.500" textStyle="body2">
								{formatFileSize(file.size)}
							</Text>
						</HStack>
					</VStack>
				</HStack>
				<IconButton
					aria-label="delete-file"
					icon={<FiX />}
					variant="ghost"
					colorScheme="gray"
					onClick={onDelete}
					isDisabled={isDisabled}
				/>
			</HStack>
		</ContentContainer>
	);
};
