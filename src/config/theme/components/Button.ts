import { ComponentStyleConfig } from '@chakra-ui/react';

const componentOverride: ComponentStyleConfig = {
	baseStyle: {
		fontFamily: 'body',
		fontSize: 'body1',
		fontWeight: 'semibold',
		borderRadius: 'full',
		lineHeight: 'body1',
	},
	variants: {
		solidDefault: {
			bg: 'gray.200',
			color: 'black',
			_hover: {
				bg: 'gray.300',
			},
			_active: {
				bg: 'gray.400',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		solidWhite: {
			bg: 'White',
			color: 'brand-primary.default',
			_hover: {
				bg: 'gray.100',
			},
			_active: {
				bg: 'gray.200',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		solidPrimary: {
			bg: 'brand-primary.default',
			color: 'white',
			_hover: {
				bg: 'brand-primary.500',
			},
			_active: {
				bg: 'brand-primary.400',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},

		solidSecondary: {
			bg: 'brand-secondary.default',
			color: 'black',
			_hover: {
				bg: 'brand-secondary.500',
			},
			_active: {
				bg: 'brand-secondary.400',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		solidDefaultForm: {
			bg: 'gray.200',
			color: 'black',
			borderRadius: '0.5rem',
			_hover: {
				bg: 'gray.300',
			},
			_active: {
				bg: 'gray.400',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		solidPrimaryForm: {
			bg: 'brand-primary.default',
			color: 'white',
			borderRadius: '0.5rem',
			_hover: {
				bg: 'brand-primary.500',
			},
			_active: {
				bg: 'brand-primary.400',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		solidSecondaryForm: {
			bg: 'brand-secondary.default',
			color: 'white',
			borderRadius: '0.5rem',
			_hover: {
				bg: 'brand-secondary.500',
			},
			_active: {
				bg: 'brand-secondary.400',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		outlinePrimary: {
			bg: 'transparent',
			border: '1px solid',
			borderColor: 'brand-primary.default',
			color: 'brand-primary.default',
			_hover: {
				borderColor: 'brand-primary.500',
				color: 'brand-primary.500',
			},
			_active: {
				borderColor: 'brand-primary.400',
				bg: 'brand-primary.50',
				color: 'brand-primary.400',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		outlineDefault: {
			bg: 'transparent',
			border: '1px solid',
			borderColor: 'gray.200',
			color: 'black',
			_hover: {
				borderColor: 'gray.500',
			},
			_active: {
				borderColor: 'gray.800',
				bg: 'gray.100',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		outlineSecondary: {
			bg: 'transparent',
			border: '1px solid',
			borderColor: 'brand-secondary.700',
			color: 'brand-secondary.700',
			_hover: {
				borderColor: 'brand-secondary.default',
				color: 'brand-secondary.default',
			},
			_active: {
				borderColor: 'brand-secondary.500',
				bg: 'brand-secondary.50',
				color: 'brand-secondary.500',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		ghostPrimary: {
			bg: 'transparent',
			border: '1px solid',
			borderColor: 'brand-primary.default',
			color: 'brand-primary.default',
			_hover: {
				bg: 'brand-primary.default',
				color: 'white',
			},
			_active: {
				borderColor: 'brand-primary.400',
				bg: 'brand-primary.400',
				color: 'white',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		ghostSecondary: {
			bg: 'transparent',
			border: '1px solid',
			borderColor: 'brand-secondary.700',
			color: 'brand-secondary.700',
			_hover: {
				borderColor: 'brand-secondary.default',
				bg: 'brand-secondary.default',
				color: 'white',
			},
			_active: {
				borderColor: 'brand-secondary.400',
				bg: 'brand-secondary.400',
				color: 'white',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		ghostDefault: {
			bg: 'transparent',
			border: '1px solid',
			borderColor: 'gray.200',
			color: 'black',
			_hover: {
				bg: 'gray.200',
			},
			_active: {
				bg: 'gray.300',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
		shadowPrimary: {
			bg: 'brand-primary.default',
			color: 'white',
			boxShadow: '0 6px 15px #05386B80',
			_hover: {
				bg: 'brand-primary.500',
			},
			_active: {
				bg: 'brand-primary.400',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
				boxShadow: '0 6px 15px #05386B80',
			},
		},
		shadowSecondary: {
			bg: 'brand-secondary.default',
			color: 'black',
			boxShadow: '0 6px 15px #5CDB9580',
			_hover: {
				bg: 'brand-secondary.500',
			},
			_active: {
				bg: 'brand-secondary.400',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
				boxShadow: '0 6px 15px #5CDB9580',
			},
		},
		shadowDefault: {
			bg: 'gray.200',
			color: 'black',
			boxShadow: '0 6px 15px #D4D4D880',
			_hover: {
				bg: 'gray.300',
			},
			_active: {
				bg: 'gray.400',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
				boxShadow: '0 6px 15px #D4D4D880',
			},
		},
		mockupSecondary: {
			bg: 'brand-secondary.default',
			color: 'white',
			fontSize: '0.75rem',
			w: '100%',
			borderRadius: '0.25rem',
			_hover: {
				bg: 'brand-secondary.500',
			},
			_active: {
				bg: 'brand-secondary.400',
				transform: 'scale(0.98)',
			},
			_disabled: {
				opacity: 0.5,
				pointerEvents: 'none',
			},
		},
	},
	defaultProps: {
		size: 'sm',
		colorScheme: 'gray',
		variant: 'solid',
	},
};

export default componentOverride;
