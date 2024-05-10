import React from 'react';

import { Link, LinkProps } from '@chakra-ui/react';
import { LinkProps as RouterLinkProps, Link as RouterLink } from 'react-router-dom';

interface SuperLinkProps {
	children: React.ReactNode;
	_hover?: LinkProps['_hover'];
}

type SuperLinkPropsType = SuperLinkProps & LinkProps & RouterLinkProps;

export const SuperLink: React.FC<SuperLinkPropsType> = (props) => {
	const { children, _hover, ...rest } = props;
	return (
		<Link as={RouterLink} _hover={_hover ? _hover : { textDecoration: 'none' }} {...rest}>
			{children}
		</Link>
	);
};
