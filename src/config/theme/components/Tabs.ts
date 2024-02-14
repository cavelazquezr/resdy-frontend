import { tabsAnatomy as parts } from '@chakra-ui/anatomy';
import { ComponentStyleConfig } from '@chakra-ui/react';
import { PartsStyleObject } from '@chakra-ui/theme-tools';

export const baseStyle: PartsStyleObject<typeof parts> = {
	tab: {
		p: '0.5rem 1rem',
		bg: 'none',
		color: 'brand-primary.default',
		fontWeight: 'semibold',
		borderRadius: 'full',
		_selected: {
			bg: 'brand-primary.default',
			color: 'white',
		},
	},
	tabpanel: {
		p: '0rem',
		mt: '1rem',
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
