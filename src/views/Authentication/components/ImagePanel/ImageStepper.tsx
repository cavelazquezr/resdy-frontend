import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

interface IProps {
	steps: number;
	stepsDone: number;
}

export const ImageStepper: React.FC<IProps> = (props) => {
	const { steps, stepsDone } = props;

	return (
		<Flex w="100%" gap="1rem" justifyContent="center">
			{[...Array(steps)].map((_, index) => (
				<Box
					key={index}
					w={stepsDone === index + 1 ? '2.5rem' : '1rem'}
					h="1rem"
					borderRadius="full"
					bg="white"
					transition="width 0.3s ease-in-out"
				/>
			))}
		</Flex>
	);
};
