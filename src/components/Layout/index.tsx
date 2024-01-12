import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { Topbar } from '../Topbar/Topbar';

interface IProps {
	children: React.ReactNode;
}

export const Layout: React.FC<IProps> = (props) => {
	const location = useLocation();
	const isAuthenticationForm: boolean =
		location.pathname.startsWith('/login') || location.pathname.startsWith('/register');

	return (
		<Flex h="100%" w="100%" direction="column">
			{!isAuthenticationForm && <Topbar />}
			<Flex w="100%" justifyContent="center">
				<Box
					w={
						!isAuthenticationForm
							? {
									xs: '100%',
									sm: '840px',
									md: '1024px',
									lg: '1140px',
									xl: '1140px', // From here on, global font-size is 16px
									xxl: '1320px', // From here on, global font-size is 16px
							  }
							: '100%'
					}
				>
					{props.children}
				</Box>
			</Flex>
		</Flex>
	);
};
