/* eslint-disable max-len */
import React from 'react';

import { HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FiCalendar, FiLayout, FiMap } from 'react-icons/fi';

import { IconBadge } from '../../../common/components/IconBadge/IconBadge';

export const FeatureStack: React.FC = () => {
	const features: Record<string, string | IconType>[] = [
		{
			icon: FiLayout,
			title: 'Está todo a tu alcance en nuestra plataforma',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
		},
		{
			icon: FiMap,
			title: 'Encuentra restaurantes que estén cerca de tí',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
		},
		{
			icon: FiCalendar,
			title: 'Realiza tus reservas de manera rápida y fácil',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
		},
	];

	return (
		<Stack
			direction={{
				base: 'column',
				xs: 'row',
			}}
			spacing="2rem"
			w="100%"
		>
			{features.map(({ icon, title, description }, index) => (
				<VStack
					key={index}
					spacing="1rem"
					align={{
						base: 'center',
						xs: 'stretch',
					}}
					w="100%"
				>
					<Stack
						direction={{
							base: 'column',
							xs: 'row',
						}}
						align={{
							base: 'center',
							xs: 'flex-start',
						}}
						alignItems="center"
						justifyContent="center"
					>
						<IconBadge icon={icon as IconType} />
						<Text
							textStyle="heading6"
							color="gray.900"
							textAlign={{
								base: 'center',
								xs: 'left',
							}}
						>
							{title as string}
						</Text>
					</Stack>
					<Text
						textStyle="body1"
						color="gray.500"
						p={{
							base: '0rem 3rem',
							xs: '0rem',
						}}
					>
						{description as string}
					</Text>
				</VStack>
			))}
		</Stack>
	);
};
