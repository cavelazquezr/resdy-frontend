import React from 'react';

import { Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface IProps {
	label: string;
	icon: IconType;
}

export const IconLabel: React.FC<IProps> = (props) => {
	return (
		<HStack>
			<Flex bg="brand-primary.100" p="0.35rem" borderRadius="0.5rem">
				<Icon as={props.icon} color="brand-primary.900" />
			</Flex>
			<Text color="gray.500" textStyle="body2">
				{props.label}
			</Text>
		</HStack>
	);
};
