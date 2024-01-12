import React, { useEffect, useState } from 'react';

import { Box, BoxProps, Image } from '@chakra-ui/react';

import navigationImg from '../../../assets/landing images/navigation.png';
import { RatingPopup } from '../../../common/components/RatingPopup/RatingPopup';

export const MapSheet: React.FC<BoxProps> = (props) => {
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
		const max = 70;
		const step = 8;

		const randomX = getRandomInRange(min, max, step);
		const randomY = getRandomInRange(min, max, step);
		const randomRating = generateRandomRating();

		const uniqueKey = `${randomX}-${randomY}-${randomRating}`;

		return (
			<Box key={uniqueKey} position="absolute" zIndex={3} top={`${randomY}%`} left={`${randomX}%`} w="fit-content">
				<RatingPopup rating={randomRating} />
			</Box>
		);
	};

	const [popups, setPopups] = useState<JSX.Element[]>([]); // Specify the type as JSX.Element[]
	const [popupCount, setPopupCount] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (popupCount < getRandomInRange(8, 12, 1)) {
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
		<Box {...props} overflow="hidden">
			{popups}
			<Image objectFit="fill" objectPosition="50%" src={navigationImg} />
		</Box>
	);
};
