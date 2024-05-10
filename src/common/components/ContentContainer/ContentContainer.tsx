import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

interface IProps extends FlexProps {
	children: React.ReactNode;
}

export const ContentContainer: React.FC<IProps> = (props) => {
	return (
		<Flex
			bg="white"
			h="fit-content"
			border="1px solid"
			borderColor="brand-gray.200"
			borderRadius="0.75rem"
			boxShadow={'0 4px 10px #8F8F8F33'}
			p="1rem"
			w="100%"
			{...props}
		>
			{props.children}
		</Flex>
	);
};
