import { inputAnatomy as parts } from '@chakra-ui/anatomy';
import { ComponentStyleConfig } from '@chakra-ui/react';
import { PartsStyleObject } from '@chakra-ui/theme-tools';

export const baseStyle: PartsStyleObject<typeof parts> = {
	field: {
		textStyle: 'body3',
		color: 'gray.500',
		border: 'none',
		bg: 'gray.100',
		borderRadius: '0.375rem',
		padding: '0.3rem 1rem',
		_disabled: { opacity: 0.75 },
		_invalid: {
			border: '1px solid',
			borderColor: 'red.500',
		},
	},
};

const componentOverride: ComponentStyleConfig = {
	parts: ['field'],
	baseStyle: baseStyle,
	defaultProps: {
		variant: '',
		size: '',
	},
};

export default componentOverride;
