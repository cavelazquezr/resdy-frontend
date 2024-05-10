import { ComponentStyleConfig } from '@chakra-ui/react';

const shadowColor = '#8F8F8F33';

const componentOverride: ComponentStyleConfig = {
	baseStyle: {
		fontFamily: 'body',
		fontSize: 'body1',
		fontWeight: 'medium',
		borderRadius: 'full',
		lineHeight: 'body1',
		_active: {
			transform: 'scale(0.98)',
		},
		_disabled: {
			opacity: 0.5,
			pointerEvents: 'none',
		},
	},
	variants: {
		'default-light': {
			bg: 'brand-gray.100',
			border: '1px solid',
			color: 'gray.700',
			borderColor: 'brand-gray.200',
			boxShadow: `0 4px 10px ${shadowColor}`,
			_hover: {
				bg: 'brand-gray.200',
			},
		},
		primary: {
			bg: 'brand-primary.default',
			border: '1px solid',
			color: 'white',
			borderColor: 'brand-primary.300',
			boxShadow: `0 4px 10px ${shadowColor}`,
			_hover: {
				bg: 'brand-primary.400',
			},
		},
		defaultProps: {
			size: 'sm',
			textStyle: 'body1',
			colorScheme: 'gray',
			variant: 'solid',
		},
	},
};

export default componentOverride;
