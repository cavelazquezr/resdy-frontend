import React from 'react';

import { Img, Text, Box, HStack, VStack, Divider, IconButton } from '@chakra-ui/react';
import { FiAward, FiSmile, FiThumbsUp } from 'react-icons/fi';

import resdyLogoPrimary from '../../assets/Resdy.svg';
import MapBox from '../../common/components/MapBox/MapBox';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';

export const DiscoverView: React.FC = () => {
	return (
		<HStack w="100%" h="100vh" overflow="hidden" position="absolute" top={0} left={0}>
			<Box w="20%" h="100%">
				<VStack h="100%" align="stretch" p="1rem" alignItems="start" spacing="1rem">
					<SuperLink to="/">
						<Img src={resdyLogoPrimary} />
					</SuperLink>
					<Divider borderColor="brand-gray.200" />
					<VStack spacing="1.25rem" align="stretch">
						<Text textStyle="heading6">Restaurantes en Madrid</Text>
						<HStack w="100%" justifyContent="space-between">
							<VStack w="100%">
								<IconButton icon={<FiAward />} aria-label="feature" variant="default-light" size="lg" />
								<Text textStyle="body2" w="70%" textAlign="center">
									Más visitados
								</Text>
							</VStack>
							<VStack w="100%">
								<IconButton icon={<FiThumbsUp />} aria-label="feature" variant="default-light" size="lg" />
								<Text textStyle="body2" w="70%" textAlign="center">
									Mejor calificados
								</Text>
							</VStack>
							<VStack w="100%">
								<IconButton icon={<FiSmile />} aria-label="feature" variant="default-light" size="lg" />
								<Text textStyle="body2" w="70%" textAlign="center">
									Nuevos en Resdy
								</Text>
							</VStack>
						</HStack>
					</VStack>
					<Divider borderColor="brand-gray.200" />
				</VStack>
			</Box>
			<Box w="80%">
				<MapBox />
			</Box>
		</HStack>
	);
};
