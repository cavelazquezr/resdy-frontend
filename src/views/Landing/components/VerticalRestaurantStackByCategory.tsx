import React from 'react';

import './styles.css';
import { Box, Divider, Flex, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FiChevronRight } from 'react-icons/fi';

import { IconBadge } from '../../../common/components/IconBadge/IconBadge';
import { RestaurantCardSkeleton } from '../../../common/components/RestaurantCard/RestaurantCardSkeleton';
import { RestaurantSummary } from '../../../common/components/RestaurantSummary/RestaurantSummary';
import { SuperLink } from '../../../common/components/SuperLink/SuperLink';
import { RestaurantCardRecord } from '../../../types/restaurants';

interface IProps {
	category: string;
	icon: IconType;
	data: Array<RestaurantCardRecord>;
	isLoading?: boolean;
	onClickViewAll?: () => void;
}

export const VerticalRestaurantStackByCategory: React.FC<IProps> = (props) => {
	const { category, icon, data, isLoading, onClickViewAll } = props;

	return (
		<Box position="relative" w="100%">
			<Flex position="absolute" w="100%" top="-0.5rem" justifyContent="center">
				<IconBadge icon={icon} />
			</Flex>
			<Box mt="1.35rem" w="100%">
				<div className="stack-box-border">
					<div className="stack-box">
						<VStack spacing="1rem" mt="0.75rem" w="100%">
							<Text
								textStyle="heading6"
								my={{
									base: '0.5rem',
									md: '0rem',
								}}
								color="brand-primary.default"
							>
								{category}
							</Text>
							<Divider color="brand-gray.200" />
							{isLoading ? (
								<RestaurantCardSkeleton noOfRows={4} size="md" />
							) : (
								<React.Fragment>
									{data.map(({ brand_name, headers_url, name, ...summary }, index) => (
										<SuperLink
											key={index}
											to={`restaurant/${name}/home`}
											_hover={{ bg: 'brand-primary.50', borderRadius: '0.5rem' }}
											w="100%"
										>
											<HStack justifyContent="space-between">
												<HStack spacing="0.75rem">
													{headers_url.length > 0 ? (
														<Image
															src={headers_url[0] ?? ''}
															alt={brand_name ?? ''}
															w="5rem"
															h="5rem"
															borderRadius="0.5rem"
															objectFit="cover"
															objectPosition="center"
														/>
													) : (
														<Box bg="gray.200" w="5rem" h="5rem" borderRadius="0.5rem" />
													)}
													<VStack spacing={0} align="stretch">
														<Text textStyle="heading6" color="gray.900">
															{brand_name}
														</Text>
														<RestaurantSummary
															rating={summary.rating}
															ratingCount={summary.rating_count}
															priceAverage={summary.price_average}
															restaurantType={summary.restaurant_type}
															address={summary.address}
															city={summary.city}
														/>
													</VStack>
												</HStack>
												<Icon as={FiChevronRight} color="gray.500" h="1.5rem" w="1.5rem" strokeWidth={1} />
											</HStack>
										</SuperLink>
									))}
								</React.Fragment>
							)}
							<Divider color="brand-gray.200" />
							<SuperLink
								onClick={onClickViewAll}
								textStyle="heading6"
								to={'/discover'}
								_hover={{ color: 'brand-primary.default' }}
							>
								Ver más
							</SuperLink>
						</VStack>
					</div>
				</div>
			</Box>
		</Box>
	);
};
