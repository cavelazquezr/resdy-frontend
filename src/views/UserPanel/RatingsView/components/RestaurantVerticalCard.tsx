import React from 'react';

import {
	Card,
	Image,
	CardBody,
	Heading,
	Button,
	Text,
	HStack,
	Box,
	VStack,
	Icon,
	Avatar,
	useDisclosure,
} from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';

import { UploadRatingForm } from './UploadRatingForm';
import { StatusBadge } from '../../../../common/components/StatusBadge/StatusBadge';
import { SuperLink } from '../../../../common/components/SuperLink/SuperLink';
import { useAppSelector } from '../../../../store/store';
import { MyRatingOutput } from '../../../../types/rating';

interface IProps {
	rating: MyRatingOutput;
}

export const RestaurantVerticalCard: React.FC<IProps> = (props) => {
	const { rating } = props;
	const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
	const authenticatedUser = useAppSelector((state) => state.user.userData?.data);

	const formatter = new Intl.DateTimeFormat('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<React.Fragment>
			<Card direction={{ base: 'column', xs: 'row' }} overflow="hidden" boxShadow="none">
				<Box position="relative">
					<Box position="absolute" top="0.5rem" left="0.5rem">
						<StatusBadge status={rating.rating_info?.status || 'to_rate'} />
					</Box>
					<Image
						objectFit="cover"
						borderRadius="0.5rem"
						w={{ base: '100%', xs: '12rem' }}
						h={{ base: '100%', xs: '12rem' }}
						src={rating.header_url}
						alt={rating.name}
					/>
				</Box>
				<CardBody p="0rem 0rem 0rem 1rem">
					<HStack w="100%" justifyContent="space-between">
						<SuperLink to={`/restaurant/${rating.name}/home`}>
							<Heading size="md">{rating.brand_name}</Heading>
						</SuperLink>
						{rating.rating_info?.status !== 'finished' && (
							<Button onClick={onOpen} variant="outlinePrimary">
								Dejar reseña
							</Button>
						)}
					</HStack>
					<Text textStyle="body1" color="gray.500">{`${rating.address}, ${rating.city} - ${formatter.format(
						new Date(rating.rating_info?.created_at ?? ''),
					)}`}</Text>
					{rating.rating_info?.status === 'finished' ? (
						<VStack align="stretch" mt="1rem">
							<HStack>
								<Text textStyle="body1" fontWeight="semibold">
									{rating.rating_info.title}
								</Text>
								<HStack spacing="0.25rem" bg="brand-secondary.200" p="0.15rem 0.4rem" borderRadius="full">
									<Icon color="brand-secondary.900" as={FiStar} />
									<Text color="brand-secondary.900">{rating.rating_info.rating}</Text>
								</HStack>
							</HStack>
							<VStack spacing="1rem" align="stretch">
								<HStack align="start">
									<Avatar
										size="sm"
										src={(authenticatedUser && authenticatedUser.avatar_url) ?? 'https://bit.ly/broken-link'}
									/>
									<Box bg="brand-secondary.default" w="100%" borderRadius="0.5rem" p="0.75rem">
										<Text color="white" textStyle="body1">
											{rating.rating_info.comment}
										</Text>
									</Box>
								</HStack>
								{rating.rating_info.answer && (
									<HStack align="start">
										<VStack align="end" spacing="0.25rem" w="100%">
											<Box bg="gray.200" w="100%" borderRadius="0.5rem" p="0.75rem">
												<Text color="gray.900" textStyle="body1">
													{rating.rating_info.answer}
												</Text>
											</Box>
											<Text textStyle="body3" color="gray.500">{`${formatter.format(
												new Date(rating.rating_info.replied_at ?? ''),
											)}`}</Text>
										</VStack>
										<Avatar size="sm" src={'https://bit.ly/broken-link'} />
									</HStack>
								)}
							</VStack>
						</VStack>
					) : (
						<Text textStyle="body1" fontWeight="semibold" mt="1rem">
							Aun no has dejado reseña en este restaurante
						</Text>
					)}
				</CardBody>
			</Card>
			<UploadRatingForm ratingId={rating.id} isOpenForm={isOpen} onCloseForm={onClose} handleToggle={onToggle} />
		</React.Fragment>
	);
};
