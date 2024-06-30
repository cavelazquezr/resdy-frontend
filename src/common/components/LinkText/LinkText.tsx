import React from 'react';

import { Text, HStack, Icon, TextProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface IProps extends TextProps {
	children: React.ReactNode;
	isDisabled?: boolean;
	colorScheme?: string;
	rightIcon?: IconType;
	leftIcon?: IconType;
	onClick?: () => void;
}

export const LinkText: React.FC<IProps> = (props) => {
	const { children, colorScheme, rightIcon, leftIcon, isDisabled, onClick } = props;
	const [isHovered, setIsHovered] = React.useState<boolean>(false);

	const color = colorScheme ? colorScheme : 'brand-primary';

	const ref = React.useRef<HTMLDivElement>(null);

	const handleMouseEnter = () => {
		if (ref.current) {
			setIsHovered(true);
		}
	};
	const handleMouseLeave = () => {
		if (ref.current) {
			setIsHovered(false);
		}
	};

	return (
		<HStack
			ref={ref}
			cursor={isDisabled ? 'default' : 'pointer'}
			w="fit-content"
			opacity={isDisabled ? 0.5 : 1}
			alignItems="center"
			spacing="0.15rem"
			onMouseEnter={!isDisabled ? handleMouseEnter : undefined}
			onMouseLeave={!isDisabled ? handleMouseLeave : undefined}
			onClick={!isDisabled ? onClick : undefined}
		>
			{leftIcon && (
				<Icon
					as={leftIcon}
					color={isHovered ? `${color}.300` : `${color}.500`}
					me={isHovered ? '0.25rem' : '0'}
					transition="all 0.3s"
				/>
			)}
			<Text textStyle="body1" color={isHovered ? `${color}.300` : `${color}.500`} transition="all 0.3s" {...props}>
				{children}
			</Text>
			{rightIcon && (
				<Icon
					as={rightIcon}
					color={isHovered ? `${color}.300` : `${color}.500`}
					ms={isHovered ? '0.25rem' : '0'}
					transition="all 0.3s"
				/>
			)}
		</HStack>
	);
};
