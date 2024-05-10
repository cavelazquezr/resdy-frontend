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

	const isControlPanel: boolean = location.pathname.includes('/userpanel');

	const disableBreakpointLayoutWidth: boolean =
		isControlPanel ||
		location.pathname.startsWith('/restaurant') ||
		isAuthenticationForm ||
		location.pathname.endsWith('/');

	return (
		<Flex h="100%" w="100%" direction="column">
			{!(isAuthenticationForm || isControlPanel) && <Topbar />}
			<Flex w="100%" h="100%" mb="2rem" justifyContent="center">
				<Box w={!disableBreakpointLayoutWidth ? breakpointLayoutWidth : '100%'}>{props.children}</Box>
			</Flex>
		</Flex>
	);
};
