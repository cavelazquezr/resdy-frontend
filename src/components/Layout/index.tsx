import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { breakpointLayoutWidth } from './utils/styles';
import { Topbar } from '../Topbar/Topbar';

interface IProps {
	children: React.ReactNode;
}

export const Layout: React.FC<IProps> = (props) => {
	const location = useLocation();
	const isAuthenticationForm: boolean =
		location.pathname.startsWith('/login') || location.pathname.startsWith('/register');

	const disableBreakpointLayoutWidth: boolean = location.pathname.startsWith('/restaurant') || isAuthenticationForm;

	return (
		<Flex h="100%" w="100%" direction="column">
			{!isAuthenticationForm && <Topbar />}
			<Flex w="100%" h="100%" mb="2rem" justifyContent="center">
				<Box w={!disableBreakpointLayoutWidth ? breakpointLayoutWidth : '100%'}>{props.children}</Box>
			</Flex>
		</Flex>
	);
};
