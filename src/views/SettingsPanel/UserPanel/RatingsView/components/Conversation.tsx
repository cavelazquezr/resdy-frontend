import React from 'react';

import { Avatar, Box, Flex, HStack, Icon, IconButton, Text, VStack } from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import { ContentContainer } from '../../../../../common/components/ContentContainer/ContentContainer';
import { useAppSelector } from '../../../../../store/store';
import { RestaurantCardOutput } from '../../../../../types/common';
import { RatingDetailOutput } from '../../../../../types/rating';

interface IProps {
	rating: RestaurantCardOutput<RatingDetailOutput>;
}

export const Conversation: React.FC<IProps> = (props) => {
	const { detail } = props.rating;
	const userData = useAppSelector((state) => state.user.userData);

	const formatter = new Intl.DateTimeFormat('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<VStack align="stretch" w="100%">
			<Text textStyle="heading5" color="gray.900">
				{detail?.title}
			</Text>
			<Text>Rating</Text>
			<VStack w="100%" spacing="1rem">
				<Flex padding="0.5rem 1rem" bg="brand-gray.200" borderRadius="full">
					<Text textStyle="body2">{formatter.format(new Date(detail?.created_at ?? ''))}</Text>
				</Flex>
				<HStack alignItems="start" h="100%" w="100%">
					<Avatar src={userData?.data?.avatar_url ?? ''} />
					<Box position="relative" w="100%">
						<ContentContainer border="1px solid" borderColor="brand-gray.200" padding="1rem" borderRadius="0.5rem">
							<Text>{detail?.comment}</Text>
						</ContentContainer>
						<HStack position="absolute" bottom="-1.25rem" left="1rem" spacing="0.25rem">
							<IconButton variant="default-light" size="sm" aria-label="edit_rating" icon={<Icon as={FiEdit} />} />
							<IconButton variant="default-light" size="sm" aria-label="remove_rating" icon={<Icon as={FiTrash2} />} />
						</HStack>
					</Box>
				</HStack>
			</VStack>
		</VStack>
	);
};
