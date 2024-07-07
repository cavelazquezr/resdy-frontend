import React, { useRef, useEffect } from 'react';

import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { LoginForm } from './components/LoginForm/LoginForm';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { RestaurantCreationForm } from './components/RestaurantCreationForm/RestaurantCreationForm';
import video from '../../assets/videos/background.mp4';
import { ContentContainer } from '../../common/components/ContentContainer/ContentContainer';
import { LinkText } from '../../common/components/LinkText/LinkText';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';

export const AuthenticationView: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const location = useLocation();
	const isRegisterView = location.pathname.includes('/register');
	const isLoginView = location.pathname.includes('/login');

	const isAuthenticationView = isRegisterView || isLoginView;

	console.log('isAuthenticationView', isAuthenticationView);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.playbackRate = 0.85; // Adjust this value to set the desired playback speed
		}
	}, []);

	return (
		<Flex
			id="background"
			w="100%"
			h="100vh"
			alignItems="center"
			justifyContent="center"
			position="relative"
			overflow="hidden"
		>
			<video
				ref={videoRef}
				autoPlay
				muted
				loop
				playsInline
				style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
			>
				<source src={video} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<ContentContainer bg="white" w="fit-content" padding="2rem" borderRadius="lg" boxShadow="lg">
				{isAuthenticationView ? (
					<VStack spacing="1rem" w="27rem">
						{isLoginView ? <LoginForm /> : <RegisterForm />}
						<HStack justifyContent="center">
							<Text textStyle="body1" color="gray.500">
								¿Eres dueño de restaurante?
							</Text>
							<SuperLink to="/create-restaurant">
								<LinkText fontWeight="medium">Registrar restaurante</LinkText>
							</SuperLink>
						</HStack>
					</VStack>
				) : (
					<RestaurantCreationForm />
				)}
			</ContentContainer>
		</Flex>
	);
};
