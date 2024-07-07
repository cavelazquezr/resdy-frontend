import React from 'react';

import { VStack, Text, Divider, Grid, GridItem, HStack, Icon, Box } from '@chakra-ui/react';
import { FiBookOpen, FiClipboard, FiImage, FiInfo, FiMessageSquare } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import { InformationView } from './InformationView';
import { IconBadge } from '../../../common/components/IconBadge/IconBadge';
import { SuperLink } from '../../../common/components/SuperLink/SuperLink';
import { UserAvatar } from '../../../common/components/UserAvatar/UserAvatar';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useAppSelector } from '../../../store/store';

const sections = [
	{
		name: 'information',
		label: 'Información',
		icon: FiInfo,
		description: 'Información general y adicional de tu restaurante',
		component: InformationView,
		path: '/admin/information',
	},
	{
		name: 'customization',
		label: 'Personalización',
		icon: FiImage,
		description: 'Aspéctos gráficos de tu restaurante.',
		component: () => <>Foo</>,
		path: '/admin/customization',
	},
	{
		name: 'bookings',
		label: 'Reservas',
		icon: FiBookOpen,
		description: 'Administra todas las reservas de tu restaurante.',
		component: () => <>Foo</>,
		path: '/admin/bookings',
	},
	{
		name: 'ratings',
		label: 'Reseñas',
		icon: FiMessageSquare,
		description: 'Visualiza y gestiona las reseñas de tu restaurante.',
		component: () => <>Foo</>,
		path: '/admin/ratings',
	},
	{
		name: 'menu',
		label: 'Menú',
		icon: FiClipboard,
		description: 'Administra el menú de tu restaurante.',
		component: () => <>Menu</>,
		path: '/admin/menu',
	},
];

export const AdminPanelLayout: React.FC = () => {
	const { panelSection } = useCustomParams(['panelSection']);

	const currentSection = sections.find((section) => section.name === panelSection) ?? sections[0];

	return (
		<Grid templateColumns="repeat(12, 1fr)" columnGap="2rem">
			<GridItem colSpan={2}>
				<Sidebar />
			</GridItem>
			<GridItem colSpan={9} padding="1rem" h="100vh">
				<VStack align="stretch" spacing="1rem" h="100%" overflowY="hidden">
					<HStack justifyContent="space-between" minH="3rem">
						<HStack spacing="1rem">
							<IconBadge icon={currentSection.icon} />
							<VStack align="stretch" spacing={0}>
								<Text textStyle="heading6">{currentSection.label}</Text>
								<Text textStyle="body2" color="gray.500">
									{currentSection.description}
								</Text>
							</VStack>
						</HStack>
					</HStack>
					<Divider borderColor="brand-gray.200" />
					<currentSection.component />
				</VStack>
			</GridItem>
		</Grid>
	);
};

const Sidebar: React.FC = () => {
	const { pathname } = useLocation();
	const userData = useAppSelector((state) => state.user.userData?.data);

	return (
		<VStack
			spacing="1rem"
			align="stretch"
			padding="1rem"
			borderRight="1px solid"
			borderRightColor="brand-gray.200"
			h="100%"
		>
			<HStack minH="3rem">
				<UserAvatar avatarPath={userData?.avatar_url} size="md" />
				<VStack align="stretch" spacing={0}>
					<Text textStyle="body1" fontWeight="medium" color="gray.900">
						{`¡Hola, ${userData?.firstname}!`}
					</Text>
					<Text textStyle="body2" color="gray.500">
						{userData?.email}
					</Text>
				</VStack>
			</HStack>
			<Divider borderColor="brand-gray.200" />
			<Text textStyle="body1" color="gray.900" fontWeight="medium">
				Opciones
			</Text>
			<VStack spacing="0.25rem" align="stretch">
				{sections.map((item, index) => (
					<SuperLink to={item.path} key={index}>
						<HStack
							spacing="1rem"
							p="0.5rem 1rem"
							borderRadius="0.5rem"
							_hover={{ bg: 'brand-primary.50' }}
							transition="background-color 0.2s ease-in-out"
							position="relative"
						>
							{pathname.includes(item.path) && (
								<Box
									position="absolute"
									mx="-1rem"
									left="-0.375rem"
									h="0.75rem"
									w="0.75rem"
									bg="brand-primary.default"
									borderRadius="0.5rem"
								/>
							)}
							<Icon as={item.icon} h="1.25rem" w="1.25rem" />
							<Text textDecoration="none" textStyle="body1" color="gray.700">
								{item.label}
							</Text>
						</HStack>
					</SuperLink>
				))}
			</VStack>
		</VStack>
	);
};
