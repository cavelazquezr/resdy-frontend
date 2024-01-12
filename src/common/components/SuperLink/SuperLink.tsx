import React from 'react';

import { Link, LinkProps } from '@chakra-ui/react';
import { LinkProps as RouterLinkProps, Link as RouterLink } from 'react-router-dom';

interface SuperLinkProps {
	children: React.ReactNode;
}

type SuperLinkPropsType = SuperLinkProps & LinkProps & RouterLinkProps;

export const SuperLink: React.FC<SuperLinkPropsType> = (props) => {
	const { children, ...rest } = props;
	return (
		<Link as={RouterLink} _hover={{ textDecoration: 'none' }} {...rest}>
			{children}
		</Link>
	);
};
