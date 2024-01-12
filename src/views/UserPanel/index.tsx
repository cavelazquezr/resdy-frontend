import React from 'react';

import { VStack, Text, Divider, Grid, GridItem, HStack, Button, Icon } from '@chakra-ui/react';
import { FiBookOpen, FiBookmark, FiMessageSquare, FiUser } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import { BookingsView } from './BookingsView';
import { InformationView } from './InformationView';
import { ListsView } from './ListsView';
import { RatingsView } from './RatingsView';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';
import { useCustomParams } from '../../hooks/useCustomParams';

export const UserPanelLayout: React.FC = () => {
	const { panelSection } = useCustomParams(['panelSection']);

	const sections = [
		{
			name: 'information',
			label: 'Información personal',
			description: 'Actualiza la información de tu perfil a enviar al restaurante al hacer una reserva',
			component: InformationView,
		},
		{
			name: 'bookings',
			label: 'Mis reservas',
			description: 'Aquí podrás gestionar y ver tus reservas.',
			component: BookingsView,
		},
		{
			name: 'list',
			label: 'Guardados',
			description: 'Aquí podrás gestionar tus restaurantes guardados',
			component: ListsView,
		},
		{
			name: 'ratings',
			label: 'Mis reseñas',
			description: 'Aquí podrás gestionar y ver tus reseñas.',
			component: RatingsView,
		},
	];

	const currentSection = sections.find((section) => section.name === panelSection);

	return (
		<VStack align="stretch" spacing="1rem">
			<Text textStyle="heading5">Panel de usuario</Text>
			<Divider />
			<Grid templateColumns="repeat(12, 1fr)" columnGap="2rem">
				<GridItem colSpan={3}>
					<Sidebar />
				</GridItem>
				<GridItem colSpan={9}>
					<VStack align="stretch" spacing="1rem">
						<HStack justifyContent="space-between">
							<VStack align="stretch">
								<Text textStyle="heading6">{currentSection?.label ?? 'Sección'}</Text>
								<Text textStyle="body1" color="gray.500">
									{currentSection?.description ?? 'Descripción'}
								</Text>
							</VStack>
							<Button variant="solidPrimary" size="md">
								Guardar cambios
							</Button>
						</HStack>
						<Divider />
						{currentSection?.component && <currentSection.component />}
					</VStack>
				</GridItem>
			</Grid>
		</VStack>
	);
};

const Sidebar: React.FC = () => {
	const { pathname } = useLocation();
	const menuItems = [
		{
			label: 'Información personal',
			icon: FiUser,
			path: '/userpanel/information',
		},
		{
			label: 'Mis reservas',
			icon: FiBookOpen,
			path: '/userpanel/bookings',
		},
		{
			label: 'Guardados',
			icon: FiBookmark,
			path: '/userpanel/list',
		},
		{
			label: 'Mis reseñas',
			icon: FiMessageSquare,
			path: '/userpanel/ratings',
		},
	];

	return (
		<VStack spacing="0.25rem" align="stretch">
			{menuItems.map((item, index) => (
				<SuperLink to={item.path} key={index}>
					<HStack
						spacing="1rem"
						p="0.5rem 1rem"
						bg={pathname.includes(item.path) ? 'brand-primary.50' : undefined}
						borderRadius="0.5rem"
						_hover={{ bg: 'brand-primary.50' }}
						transition="background-color 0.2s ease-in-out"
					>
						<Icon as={item.icon} h="1.25rem" w="1.25rem" />
						<Text textDecoration="none" textStyle="body1" color="gray.700" fontWeight="semibold">
							{item.label}
						</Text>
					</HStack>
				</SuperLink>
			))}
		</VStack>
	);
};
