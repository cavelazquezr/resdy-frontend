import React from 'react';

import { Text, Divider, Flex, Img, VStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import resdyLogoPrimary from '../../assets/Resdy.svg';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';
import { breakpointLayoutWidth } from '../Layout/utils/styles';

export const Footer: React.FC = () => {
	const location = useLocation();
	const isRestautantView = location.pathname.includes('/restaurant');
	return (
		<Flex
			w="100%"
			mt="2rem"
			as="footer"
			borderTop="1px solid"
			borderTopColor="brand-gray.200"
			justifyContent="center"
			bg={isRestautantView ? 'white' : 'brand-gray.100'}
			padding={isRestautantView ? '2rem 0' : '2rem'}
		>
			<VStack width={breakpointLayoutWidth} align="stretch" spacing="1rem" w="100%">
				<SuperLink to="/">
					<Img src={resdyLogoPrimary} />
				</SuperLink>
				<Divider />
				<Text textStyle="body2" color="gray.500" w="20rem">
					Plataforma piloto. Ninguno de los datos que se muestran aquí son reales.
				</Text>
				<Divider />
				<Text textStyle="body2" color="gray.500">
					© 2024 Resdy Pilot
				</Text>
			</VStack>
		</Flex>
	);
};
