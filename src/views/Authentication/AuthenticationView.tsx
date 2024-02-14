import React from 'react';

import { Box, Flex, HStack, Text } from '@chakra-ui/react';

import { ImagePanel } from './components/ImagePanel/ImagePanel';
import { LoginForm } from './components/LoginForm/LoginForm';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';

interface IProps {
	loginView?: boolean;
}
export const AuthenticationView: React.FC<IProps> = (props) => {
	const { loginView } = props;
	return (
		<HStack w="100%" h="100vh">
			<Flex flexDir="column" w={{ base: '100%', xs: '50%' }} h="100%" alignItems="center" justifyContent="center">
				{loginView ? <LoginForm /> : <RegisterForm />}
				<HStack justifyContent="center" position="relative" top="10%">
					<Text textStyle="body1" color="gray.500">
						¿Eres dueño de restaurante?
					</Text>
					<SuperLink to="/register-restaurant">
						<Text textStyle="body1" fontWeight="bold" color="brand-secondary.default">
							Registrar restaurante
						</Text>
					</SuperLink>
				</HStack>
			</Flex>
			<Box display={{ base: 'none', xs: 'block' }} w={{ base: '0%', xs: '50%' }} h="100%" bg="brand-primary.default">
				<ImagePanel />
			</Box>
		</HStack>
	);
};
