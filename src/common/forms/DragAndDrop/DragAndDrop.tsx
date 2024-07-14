import React from 'react';

import { Box, Icon, Text, VStack, Button, Input, useToast, HStack } from '@chakra-ui/react';
import { FiShare } from 'react-icons/fi';

import { FilePreview } from './components/FilePreview';
import { FormField } from '../../../types/form';

interface IProps {
	id?: string;
	field?: FormField;
	isDisabled?: boolean;
	hideLabel?: boolean;
	filesLimit?: number;
}

export const DragAndDrop: React.FC<IProps> = (props) => {
	const { id, field, isDisabled, hideLabel, filesLimit } = props;
	const [files, setFiles] = React.useState<File[]>([]);

	const toast = useToast();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList: FileList | null = e.target.files;
		if (fileList) {
			const newFilesArray: File[] = Array.from(fileList);
			const totalFiles = files.length + newFilesArray.length;

			if (filesLimit && totalFiles > filesLimit) {
				// Handle the case where the total number of files exceeds the limit
				toast({
					title: 'Error',
					description: `Solo puedes subir un máximo de ${filesLimit} archivos.`,
					status: 'error',
					duration: 4000,
				});
				return;
			}

			setFiles((prevFiles) => [...prevFiles, ...newFilesArray]);
		}
	};

	React.useEffect(() => {
		field && field.dispatcher && field.dispatcher(files);
	}, [files]);

	const handleDeleteFile = (fileToDelete: File) => {
		field && field.dispatcher && field.dispatcher([]);
		setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
	};

	return (
		<VStack align="start" spacing="0.5rem" w="100%">
			{field && !hideLabel && (
				<Text textStyle="body2" color="gray.900" opacity={isDisabled ? '0.5' : '1'}>
					{field.label}
				</Text>
			)}
			{(!filesLimit && files.length === 0) ||
				(filesLimit && files.length < filesLimit && (
					<form style={{ width: '100%' }}>
						<label htmlFor={id ?? 'file-upload'}>
							<Box
								border="1px dashed"
								borderColor="brand-gray.200"
								borderRadius="0.5rem"
								w="100%"
								maxW="25rem"
								p="1rem"
								opacity={isDisabled ? '0.5' : undefined}
							>
								<VStack>
									<Icon as={FiShare} />
									<Text textStyle="body2" fontWeight="medium" color="gray.900">
										Seleccione o arrastra un archivo
									</Text>
									<Text textStyle="body2" color="gray.500">
										JPEG, PNG, hasta 50 MB
									</Text>
									<Button as="span" variant="default-light" size="xs" isDisabled={isDisabled}>
										Seleccionar archivo
									</Button>
									<Input
										id={id ?? 'file-upload'}
										accept="image/*"
										type="file"
										hidden
										onChange={handleFileChange}
										isDisabled={isDisabled}
									/>
								</VStack>
							</Box>
						</label>
					</form>
				))}
			{files.length > 0 && (
				<HStack w="100%">
					{files.map((file, index) => (
						<FilePreview key={index} file={file} onDelete={() => handleDeleteFile(file)} isDisabled={isDisabled} />
					))}
				</HStack>
			)}
		</VStack>
	);
};
