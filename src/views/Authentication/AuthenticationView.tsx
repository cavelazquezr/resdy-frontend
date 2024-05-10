import React from 'react';

import { Flex, HStack, Text, VStack } from '@chakra-ui/react';

import { LoginForm } from './components/LoginForm/LoginForm';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { ContentContainer } from '../../common/components/ContentContainer/ContentContainer';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';

interface IProps {
	loginView?: boolean;
}
export const AuthenticationView: React.FC<IProps> = (props) => {
	const { loginView } = props;
	return (
		<Flex w="100%" h="100vh" alignItems="center" justifyContent="center" bg="gray.50">
			<ContentContainer w="fit-content" padding="2rem">
				<VStack w="100%" spacing="1rem">
					{loginView ? <LoginForm /> : <RegisterForm />}
					<HStack justifyContent="center">
						<Text textStyle="body1" color="gray.500">
							¿Eres dueño de restaurante?
						</Text>
						<SuperLink to="/register-restaurant">
							<Text textStyle="body1" fontWeight="bold" color="brand-secondary.default">
								Registrar restaurante
							</Text>
						</SuperLink>
					</HStack>
				</VStack>
			</ContentContainer>
		</Flex>
	);
};
