import React from 'react';

import { Flex, HStack, Text, VStack } from '@chakra-ui/react';

import { LoginForm } from './components/LoginForm/LoginForm';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { ContentContainer } from '../../common/components/ContentContainer/ContentContainer';
import { LinkText } from '../../common/components/LinkText/LinkText';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';

interface IProps {
	loginView?: boolean;
}
export const AuthenticationView: React.FC<IProps> = (props) => {
	const { loginView } = props;
	return (
		<Flex w="100%" h="100vh" alignItems="center" justifyContent="center" bg="gray.50">
			<ContentContainer w="fit-content" padding="2rem">
				<VStack spacing="1rem" w="27rem">
					{loginView ? <LoginForm /> : <RegisterForm />}
					<HStack justifyContent="center">
						<Text textStyle="body1" color="gray.500">
							¿Eres dueño de restaurante?
						</Text>
						<SuperLink to="/register-restaurant">
							<LinkText fontWeight="medium">Registrar restaurante</LinkText>
						</SuperLink>
					</HStack>
				</VStack>
			</ContentContainer>
		</Flex>
	);
};
