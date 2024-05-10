import React from 'react';

import { HStack, Icon, Text } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';

interface IProps {
	error: string;
}

export const InputErrorMessage: React.FC<IProps> = (props) => {
	const { error } = props;
	return (
		<HStack w="inherit">
			<Icon color="red.500" as={FiAlertTriangle} />
			<Text textStyle="body2" color="red.500">
				{error}
			</Text>
		</HStack>
	);
};
