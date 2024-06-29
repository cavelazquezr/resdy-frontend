import React from 'react';

import { Box, Icon, Text, VStack, Button, Input } from '@chakra-ui/react';
import { FiShare } from 'react-icons/fi';

import { FilePreview } from './components/FilePreview';
import { FormField } from '../../../types/form';

interface IProps {
	id?: string;
	field?: FormField;
	isDisabled?: boolean;
}

export const DragAndDrop: React.FC<IProps> = (props) => {
	const { field, isDisabled } = props;
	const [files, setFiles] = React.useState<File[]>([]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList: FileList | null = e.target.files;
		if (fileList) {
			const filesArray: File[] = Array.from(fileList);
			field && field.dispatcher && field.dispatcher(fileList);
			setFiles(filesArray);
		}
	};

	const handleDeleteFile = (fileToDelete: File) => {
		field && field.dispatcher && field.dispatcher([]);
		setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
	};

	return (
		<VStack align="start" spacing="0.5rem" w="100%">
			{field && (
				<Text textStyle="body2" color="gray.900" opacity={isDisabled ? '0.5' : '1'}>
					{field.label}
				</Text>
			)}
			{files.length === 0 && (
				<form style={{ width: '100%' }}>
					<label htmlFor="file-upload">
						<Box
							border="1px dashed"
							borderColor="brand-gray.200"
							borderRadius="0.5rem"
							w="100%"
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
									// eslint-disable-next-line @typescript-eslint/no-explicit-any
									value={field && (field.value as any)}
									id="file-upload"
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
			)}
			{files.length > 0 && (
				<React.Fragment>
					{files.map((file, index) => (
						<FilePreview key={index} file={file} onDelete={() => handleDeleteFile(file)} isDisabled={isDisabled} />
					))}
				</React.Fragment>
			)}
		</VStack>
	);
};
