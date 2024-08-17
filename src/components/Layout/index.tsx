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
		location.pathname.startsWith('/login') ||
		location.pathname.startsWith('/register') ||
		location.pathname.startsWith('/create-restaurant');

	const isSettingsPanel: boolean = location.pathname.includes('/admin');

	const disableBreakpointLayoutWidth: boolean =
		isSettingsPanel || isAuthenticationForm || location.pathname.endsWith('/');

	return (
		<Flex h="100%" w="100%" direction="column">
			{!(isAuthenticationForm || isSettingsPanel) && <Topbar />}
			<Flex w="100%" h="100%" mb="2rem" justifyContent="center">
				<Box w={!disableBreakpointLayoutWidth ? breakpointLayoutWidth : '100%'}>{props.children}</Box>
			</Flex>
		</Flex>
	);
};
