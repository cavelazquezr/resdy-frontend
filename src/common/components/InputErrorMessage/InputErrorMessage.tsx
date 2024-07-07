import React from 'react';

import { FormErrorMessage, HStack, Icon } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';

interface IProps {
	error: string;
}

export const InputErrorMessage: React.FC<IProps> = (props) => {
	const { error } = props;
	return (
		<HStack w="inherit" alignItems="center" mt="0.5rem">
			<Icon color="red.500" as={FiAlertTriangle} h="100%" />
			<FormErrorMessage m={0} w="100%">
				{error}
			</FormErrorMessage>
		</HStack>
	);
};
