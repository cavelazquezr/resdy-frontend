import React from 'react';

import { Center, Text, VStack } from '@chakra-ui/react';

import notFoundIllustration from '../../../assets/illustrations/NotFoundIllustration.svg';

interface IProps {
	title?: string;
	body?: string;
}

export const NotFoundMessage: React.FC<IProps> = ({ title, body }) => {
	return (
		<Center h="100%" w="100%">
			<VStack spacing="1rem">
				<img src={notFoundIllustration} alt="Not found" />
				<VStack spacing="0.25rem">
					<Text textStyle="body1" color="gray.900" fontWeight="medium">
						{title ? title : '¡Ups! No hemos encontrado lo que buscas'}
					</Text>
					{body && (
						<Text textStyle="body1" color="gray.500">
							¡Ups! No hemos encontrado lo que buscas
						</Text>
					)}
				</VStack>
			</VStack>
		</Center>
	);
};
