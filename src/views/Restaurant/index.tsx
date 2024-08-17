import React from 'react';

import {
	Grid,
	GridItem,
	Heading,
	VStack,
	Text,
	HStack,
	Button,
	Divider,
	Box,
	Tabs,
	Flex,
	TabList,
	Tab,
	TabIndicator,
	TabPanels,
	TabPanel,
	useDisclosure,
	Image,
	IconButton,
	Icon,
} from '@chakra-ui/react';
import { useQueries } from '@tanstack/react-query';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { FiMapPin, FiShare } from 'react-icons/fi';

import { AllRatingsModal } from './components/AllRatingsModal';
import { getMenu } from '../../api/menu';
import { getRatingStats, getRatings } from '../../api/rating';
import { getRestaurants } from '../../api/restautants';
import { ContentContainer } from '../../common/components/ContentContainer/ContentContainer';
import { RatingCard } from '../../common/components/RatingCard/RatingCard';
import { RestaurantSummary } from '../../common/components/RestaurantSummary/RestaurantSummary';
import { Footer } from '../../components/Footer/Footer';
import { useCustomParams } from '../../hooks/useCustomParams';
import { MenuRecord } from '../../types/menu';
import { RatingRecord, RatingStatsOutput } from '../../types/rating';
import { RestaurantRecord } from '../../types/restaurants';

type TabContent = {
	label: string;
	component: () => JSX.Element;
};

export const RestaurantLayout: React.FC = () => {
	const { restaurantName } = useCustomParams(['restaurantName']);

	const queryBuilder = [
		{
			key: 'restaurantQuery',
			apiFn: () => getRestaurants({ name: restaurantName }),
		},
		{
			key: 'ratingStatsQuery',
			apiFn: () => getRatingStats(restaurantName),
		},
		{
			key: 'ratingsQuery',
			apiFn: () => getRatings(restaurantName),
		},
		{
			key: 'menuQuery',
			apiFn: () => getMenu(restaurantName),
		},
	];

	// All ratings modal
	const {
		isOpen: isAllRatingsModalOpen,
		onOpen: onAllRatingsModalOpen,
		onClose: onAllRatingsModalClose,
	} = useDisclosure();

	// Queries
	const [restaurantQuery, ratingStatsQuery, ratingsQuery, menuQuery] = useQueries({
		queries: queryBuilder.map((query) => ({ queryKey: [query.key], queryFn: query.apiFn })),
	});

	// Query records
	const restautantRecord = restaurantQuery.data?.data[0] as RestaurantRecord;
	const ratingStatsRecord = ratingStatsQuery.data?.data as RatingStatsOutput;
	const ratingsRecords = ratingsQuery.data?.data as RatingRecord[];
	const menuRecords = menuQuery.data?.data as MenuRecord[];

	const requestFinished =
		!restaurantQuery.isLoading && !ratingStatsQuery.isLoading && !ratingsQuery.isLoading && !menuQuery.isLoading;

	console.log('menuRecords', menuRecords);

	const tabContent: TabContent[] = [
		{
			label: 'Menu',
			component: () => (
				<VStack align="stretch" spacing="1rem">
					<Text textStyle="heading5">Menu</Text>
					{menuRecords.map(({ category, dishes }, index) => (
						<VStack key={index} align="stretch" spacing="1rem">
							<Text textStyle="heading6">{category}</Text>
							{dishes.map((dish, index) => (
								<VStack key={index} align="stretch">
									<HStack w="100%" alignItems="end" justifyContent="space-between" position="relative">
										<Text bg="white" textStyle="body1" fontWeight="medium">
											{dish.name}
										</Text>
										<Text bg="white" textStyle="body1" fontWeight="semibold">
											{`${dish.price}€`}
										</Text>
										<Box
											borderBottom="1px solid"
											borderBottomColor="brand-gray.200"
											w="100%"
											position="absolute"
											zIndex={-1}
										/>
									</HStack>
									{dish.description && (
										<Text textStyle="body2" color="gray.500">
											{dish.description}
										</Text>
									)}
								</VStack>
							))}
						</VStack>
					))}
				</VStack>
			),
		},
		{
			label: 'Reseñas',
			component: () => (
				<>
					<VStack align="stretch" spacing="1rem">
						<Text textStyle="heading5">Reseñas</Text>
						{ratingsRecords.slice(0, 4).map((rating, index) => (
							<RatingCard key={index} rating={rating} />
						))}
						{ratingsRecords.slice(0, 4).length === 4 && (
							<Flex w="100%" justifyContent="center">
								<Button variant="default-light" onClick={onAllRatingsModalOpen}>
									Ver todas las reseñas
								</Button>
							</Flex>
						)}
					</VStack>
					<AllRatingsModal
						isOpen={isAllRatingsModalOpen}
						onClose={onAllRatingsModalClose}
						stats={ratingStatsRecord}
						ratings={ratingsRecords}
					/>
				</>
			),
		},
	];

	if (!requestFinished) return <>Loading</>;

	if (restautantRecord.extra_information.extra_description)
		tabContent.unshift({
			label: 'Descripción',
			component: () => (
				<VStack align="stretch" spacing="0.5rem">
					<Text textStyle="heading5">{`Más sobre ${restautantRecord.brand_name}`}</Text>
					<Text textStyle="body1" color="gray.500">
						{restautantRecord.extra_information.extra_description}
					</Text>
				</VStack>
			),
		});

	// const currentSection = sections.find((section) => section.name === restaurantSection);

	return (
		<React.Fragment>
			<Grid templateColumns="repeat(12, 1fr)" gap="2rem" minH="70vh">
				<GridItem colSpan={7}>
					<VStack align="stretch" spacing="1rem">
						<VStack align="stretch" spacing="0.5rem">
							<Heading as="h1" textStyle="heading1">
								{restautantRecord.brand_name}
							</Heading>
							<RestaurantSummary
								rating={Number(ratingStatsRecord.rating)}
								ratingCount={ratingStatsRecord.rating_count}
								priceAverage={restautantRecord.price_average}
								restaurantType={restautantRecord.restaurant_type}
								address={restautantRecord.address}
								city={restautantRecord.city}
								showCity
							/>
							<Text textStyle="body1" color="gray.500">
								{restautantRecord.description}
							</Text>
						</VStack>
						<HStack>
							<Button variant="default-light" leftIcon={<FiShare />}>
								Compartir
							</Button>
						</HStack>
						<Divider borderColor="brand-gray.200" />
						<VStack align="stretch" spacing="1rem">
							<Text textStyle="heading5">Reservar</Text>
							<Text textStyle="body1" color="gray.500">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
								ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
							</Text>
							<Box>Foo</Box>
						</VStack>
						<Divider borderColor="brand-gray.200" />
						<Tabs variant="unstyled" colorScheme="green" position="relative">
							<HStack spacing="25%">
								<Flex
									position="relative"
									bg="gray.100"
									w="fit-content"
									py="0.25rem"
									px="0.5rem"
									alignItems="center"
									borderRadius="0.5rem"
								>
									<TabList zIndex={2}>
										{tabContent.map((tab, index) => (
											<Tab minW="10rem" key={index}>
												{tab.label}
											</Tab>
										))}
									</TabList>
									<TabIndicator
										position="absolute"
										zIndex={1}
										height="2rem"
										bg="white"
										borderRadius="0.25rem"
										boxShadow="0 4px 10px #8F8F8F33"
									/>
								</Flex>
							</HStack>
							<TabPanels>
								{tabContent.map((tab, index) => (
									<TabPanel p={0} mt="1rem" key={index}>
										{tab.component()}
									</TabPanel>
								))}
							</TabPanels>
						</Tabs>
					</VStack>
				</GridItem>
				<GridItem colSpan={5}>
					<VStack align="stretch" spacing="2rem">
						<Box h="30rem" borderRadius="0.5rem" overflow="hidden">
							<Image w="100%" h="100%" objectFit="cover" src={restautantRecord.headers_url[0]} alt="header" />
						</Box>
						<ContentContainer p={0}>
							<VStack align="stretch" w="100%">
								<Box bg="gray.200" h="10rem" w="100%"></Box>
								<VStack align="stretch" spacing="1rem" padding="1.5rem">
									<VStack align="stretch" spacing="0rem">
										<Text textStyle="heading5">{restautantRecord.brand_name}</Text>
										<HStack>
											{restautantRecord.social_media.tiktok && (
												<IconButton variant="ghost" aria-label="TikTok" icon={<FaTiktok />} />
											)}
											{restautantRecord.social_media.facebook && (
												<IconButton variant="ghost" aria-label="TikTok" icon={<FaFacebook />} />
											)}
											{restautantRecord.social_media.instagram && (
												<IconButton variant="ghost" aria-label="TikTok" icon={<FaInstagram />} />
											)}
											{restautantRecord.social_media.twitter && (
												<IconButton variant="ghost" aria-label="TikTok" icon={<FaTwitter />} />
											)}
										</HStack>
									</VStack>
									<Divider />
									<HStack spacing={0} alignItems="center">
										<Icon me="0.25rem" as={FiMapPin} color="gray.500" />
										<Text textStyle="body2" color="gray.500">
											{`${restautantRecord.address}, ${restautantRecord.city}`}
										</Text>
									</HStack>
								</VStack>
							</VStack>
						</ContentContainer>
					</VStack>
				</GridItem>
			</Grid>
			<Footer />
		</React.Fragment>
	);
};
