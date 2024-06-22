import React from 'react';

import { Box, Icon, Text, VStack, Button, Input } from '@chakra-ui/react';
import { FiShare } from 'react-icons/fi';

export const DragAndDrop: React.FC = () => {
	return (
		<form>
			<label htmlFor="file-upload">
				<Box border="1px dashed" borderColor="brand-gray.200" borderRadius="0.5rem" p="1rem">
					<VStack>
						<Icon as={FiShare} />
						<Text textStyle="body2" fontWeight="medium" color="gray.900">
							Seleccione o arrastra un archivo
						</Text>
						<Text textStyle="body2" color="gray.500">
							JPEG, PNG, hasta 50 MB
						</Text>
						<Button as="span" variant="default-light" size="xs">
							Seleccionar archivo
						</Button>
						<Input id="file-upload" accept="image/*" type="file" hidden />
					</VStack>
				</Box>
			</label>
		</form>
	);
};
