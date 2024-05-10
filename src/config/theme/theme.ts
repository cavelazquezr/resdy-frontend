import { extendTheme } from '@chakra-ui/react';

import Button from './components/Button';
import Input from './components/Input';
import Select from './components/Select';
import Tabs from './components/Tabs';

// Numbers: add 200 to every breakpoint
const BREAKPOINTS = {
	xs: '768px',
	sm: '1224px',
	md: '1480px',
	lg: '1560px',
	xl: '1736px',
	xxl: '2500px',
};

const fontSizeBreakpoints = {
	'@media screen and (max-width: 1480px)': {
		fontSize: '12px',
	},
	'@media screen and (min-width: 1480px) and (max-width: 1560px)': {
		fontSize: '14px',
	},
	'@media screen and (min-width: 1560px)': {
		fontSize: '16px',
	},
	'@media screen and (min-width: 2500px)': {
		fontSize: '24px',
	},
};

const themeBreakpoints = BREAKPOINTS;

export const theme = extendTheme({
	colors: {
		'brand-primary': {
			900: '#043C3D',
			800: '#064A4B',
			700: '#085759',
			600: '#0E686A',
			500: '#0F7173',
			400: '#2E8587',
			300: '#4D999A',
			200: '#8DBFC0',
			100: '#ADD2D2',
			50: '#CEE4E5',
			default: '#0F7173',
		},
		'brand-secondary': {
			900: '#1D663E',
			800: '#2A8653',
			700: '#39A469',
			600: '#4AC07F',
			500: '#70E2A3',
			400: '#84E8B1',
			300: '#99EDBF',
			200: '#AFF2CD',
			100: '#C5F7DB',
			50: '#DCFAEA',
			default: '#5CDB95',
		},
		'brand-gray': {
			200: '#E0E0E0',
			100: '#FBFBFB',
			50: '#FFFFFF',
		},
	},
	fonts: {
		heading: 'Sora, sans serif',
		body: 'Inter',
	},
	fontSizes: {
		heading1: '3.75rem',
		heading2: '3rem',
		heading3: '2.25rem',
		heading4: '1.875rem',
		heading5: '1.5rem',
		heading6: '1.25rem',
		body1: '1rem',
		body2: '0.875rem',
		body3: '0.75rem',
		body4: '0.625rem',
		label1: '0.875rem',
	},
	lineHeights: {
		heading1: '3rem',
		heading2: '3rem',
		heading3: '2.5rem',
		heading4: '2.25rem',
		heading5: '2rem',
		heading6: '1.25rem',
		body1: '1.25rem',
		body2: '1.15rem',
		body3: '1rem',
		body4: '1rem',
		label1: '1.15rem',
	},
	textStyles: {
		heading1: {
			fontFamily: 'heading',
			fontSize: 'heading1',
			fontWeight: 'extrabold',
			lineHeight: 'heading1',
			letterSpacing: '-0.07em',
		},
		heading2: {
			fontFamily: 'heading',
			fontSize: 'heading2',
			fontWeight: '800',
			lineHeight: 'heading2',
			letterSpacing: '-0.07em',
		},
		heading3: {
			fontFamily: 'heading',
			fontSize: 'heading3',
			fontWeight: 'bold',
			lineHeight: 'heading3',
			letterSpacing: '-0.07em',
		},
		heading4: {
			fontFamily: 'heading',
			fontSize: 'heading4',
			fontWeight: 'bold',
			lineHeight: 'heading4',
			letterSpacing: '-0.07em',
		},
		heading5: {
			fontFamily: 'heading',
			fontSize: 'heading5',
			fontWeight: 'bold',
			lineHeight: 'heading5',
			letterSpacing: '-0.07em',
		},
		heading6: {
			fontFamily: 'heading',
			fontSize: 'heading6',
			fontWeight: 'bold',
			lineHeight: 'heading6',
			letterSpacing: '-0.07em',
		},
		body1: {
			fontFamily: 'body',
			fontSize: 'body1',
			fontWeight: 'regular',
			lineHeight: 'body1',
		},
		body2: {
			fontFamily: 'body',
			fontSize: 'body2',
			fontWeight: 'regular',
			lineHeight: 'body2',
		},
		body3: {
			fontFamily: 'body',
			fontSize: 'body3',
			fontWeight: 'regular',
			lineHeight: 'body3',
		},
		body4: {
			fontFamily: 'body',
			fontSize: 'body4',
			fontWeight: 'regular',
			lineHeight: 'body4',
		},
		label1: {
			fontFamily: 'heading',
			fontSize: 'label1',
			fontWeight: 'regular',
			lineHeight: 'label1',
		},
	},
	components: { Button, Input, Select, Tabs },
	styles: {
		global: () => ({
			'*': {
				boxSizing: 'border-box',
			},
			html: {
				height: '100%',
				...fontSizeBreakpoints,
			},
			body: {
				height: '100%',
				fontFamily: 'body',
				lineHeight: 'body1',
				bg: 'white',
				'#root': {
					height: '100%',
					whiteSpace: 'pre-line',
				},
			},
			'::-webkit-scrollbar': {
				width: '0.5rem',
				height: '0.5rem',
			},
			'::-webkit-scrollbar-track': {
				background: 'white.200',
			},
			'::-webkit-scrollbar-thumb': {
				background: 'gray.200',
				borderRadius: '6px',
			},
			'::-webkit-scrollbar-thumb:hover': {
				background: 'gray.100',
			},
		}),
	},
	breakpoints: themeBreakpoints,
});
