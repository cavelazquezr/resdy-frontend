import React from 'react';

import { Box, Text } from '@chakra-ui/react';
import 'animate.css';

interface IProps {
	rating: string;
	isFocus?: boolean;
}

export const RatingPopup: React.FC<IProps> = (props) => {
	const { rating, isFocus } = props;
	return (
		<Box
			className="animate__bounceIn"
			bg={isFocus ? 'brand-primary.700' : 'brand-primary.default'}
			p="0.15rem 0.65rem"
			borderRadius="0.5rem"
		>
			<Text color="white" fontSize={isFocus ? '0.85rem' : '0.75rem'} fontWeight={isFocus ? 'bold' : 'regular'}>
				{rating}
			</Text>
		</Box>
	);
};
