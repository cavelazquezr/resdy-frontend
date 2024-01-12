/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import {
	Box,
	Flex,
	VStack,
	Image,
	BoxProps,
	Grid,
	GridItem,
	HStack,
	Badge,
	Button,
	Text,
	Icon,
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';

import navigationImg from '../../../assets/landing images/navigation.png';
import { RatingPopup } from '../../../common/components/RatingPopup/RatingPopup';

export const PhoneSheet: React.FC<BoxProps> = (props) => {
	const getRandomInRange = (min, max, step) => {
		const numPossibleValues = (max - min) / step + 1;
		const randomIndex = Math.floor(Math.random() * numPossibleValues);
		return min + randomIndex * step;
	};

	const generateRandomRating = () => {
		const min = 3.5;
		const max = 5.0;
		const randomRating = (Math.random() * (max - min) + min).toFixed(1); // Generate a random rating within the range
		return randomRating;
	};

	const generateRandomPopup = () => {
		const min = 20;
		const max = 40;
		const step = 4;

		const randomX = getRandomInRange(min, max, step);
		const randomY = getRandomInRange(min, max, step);
		const randomRating = generateRandomRating();

		const uniqueKey = `${randomX}-${randomY}-${randomRating}`;

		return (
			<Box position="absolute" key={uniqueKey} zIndex={3} top={`${randomY}%`} left={`${randomX}%`} w="fit-content">
				<RatingPopup rating={randomRating} />
			</Box>
		);
	};

	const [popups, setPopups] = useState<JSX.Element[]>([]); // Specify the type as JSX.Element[]
	const [popupCount, setPopupCount] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (popupCount < getRandomInRange(4, 6, 1)) {
				setPopups((prevPopups) => [...prevPopups, generateRandomPopup()]);
				setPopupCount((count) => count + 1);
			} else {
				clearInterval(interval); // Stop generating popups after a random count
			}
		}, 250);

		return () => {
			clearInterval(interval); // Clear the interval when the component unmounts
		};
	}, [popupCount]);
	return (
		<Box {...props} borderRadius="2rem" padding="0.5rem">
			<Box bg="white" w="100%" top={0} right={0} h="100%" borderRadius="1.5rem" overflow="hidden">
				<Box position="absolute" w="inherit" h="100%" zIndex={4} />
				<VStack spacing="none" h="100%">
					<Box
						position="absolute"
						zIndex={1}
						shadow="lg"
						bgColor="black"
						w="4rem"
						h="1rem"
						borderRadius="full"
						top="1rem"
					/>
					<Flex bg="brand-primary.default" w="100%" h="15%" p="0rem 0.75rem" flexDir="column-reverse">
						<HStack w="100%" alignItems="center">
							<Box
								w="100%"
								mb="0.5rem"
								bg="brand-primary.400"
								color="white"
								textStyle="body3"
								p="0.25rem 1rem"
								borderRadius="0.5rem"
							>
								<HStack align="stretch" p="0rem" alignItems="center">
									<Icon as={FiSearch} color="white" />
									<Text>Cerca de mí</Text>
								</HStack>
							</Box>
						</HStack>
					</Flex>
					<Box h="38%" w="100%" overflow="hidden">
						<Image src={navigationImg} objectFit="cover" transform="scale(2)" overflow="hidden" />
					</Box>
					<Box bg="white" w="100%" h="42%" p="0.5rem 0.75rem">
						<VStack spacing="0.5rem" w="100%">
							<Box bgColor="gray.100" w="6rem" h="0.35rem" borderRadius="full" />
							<Grid
								templateColumns="repeat(2, 1fr)"
								templateRows="repeat(7, 1fr)"
								rowGap="0.5rem"
								columnGap="0.5rem"
								w="100%"
							>
								<GridItem rowSpan={4} colSpan={2} overflow="hidden" borderRadius="1rem 1rem 0rem 0rem">
									{popups}
									<Image
										h="6rem"
										w="100%"
										transform="scale(1.75)"
										objectFit="cover"
										objectPosition="50% 65%"
										src="https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
									/>
								</GridItem>
								<GridItem rowSpan={1} colSpan={2}>
									<HStack>
										<Badge bg="brand-primary.50">
											<HStack alignItems="center" spacing="0.25rem">
												<Icon as={AiFillStar} color="brand-primary.default" />
												<Text textTransform="capitalize" color="brand-primary.default" fontSize="0.60rem">
													4,5
												</Text>
											</HStack>
										</Badge>
										<Badge fontSize="0.60rem" textTransform="capitalize">
											<Text textTransform="capitalize" color="gray.600" fontSize="0.60rem">
												Americano
											</Text>
										</Badge>
									</HStack>
								</GridItem>
								<GridItem rowSpan={2} colSpan={1}>
									<VStack spacing="0.15rem" align="stretch">
										<Text fontFamily="heading" fontSize="0.75rem" lineHeight="none" fontWeight="bold">
											Restaurante
										</Text>
										<Text fontFamily="body" fontSize="0.5rem" lineHeight="none" color="gray.600">
											Precio medio: 15$
										</Text>
										<Text fontFamily="body" fontSize="0.5rem" lineHeight="none" color="gray.600">
											Gran Via 26, Madrid
										</Text>
									</VStack>
								</GridItem>
								<GridItem rowSpan={2} colSpan={1}>
									<Flex alignItems="" h="100%">
										<Button variant="mockupSecondary">Reservar</Button>
									</Flex>
								</GridItem>
							</Grid>
						</VStack>
					</Box>
					<Box
						position="absolute"
						zIndex={1}
						shadow="lg"
						bgColor="black"
						w="8rem"
						h="0.35rem"
						borderRadius="full"
						bottom="1rem"
					/>
				</VStack>
			</Box>
		</Box>
	);
};
