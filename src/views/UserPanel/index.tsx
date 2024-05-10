import React from 'react';

import { VStack, Text, Divider, Grid, GridItem, HStack, Icon, Avatar, Box } from '@chakra-ui/react';
import { FiBookOpen, FiBookmark, FiMessageSquare, FiUser } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import { InformationView } from './InformationView';
import { ListsView } from './ListsView';
import { RatingsView } from './RatingsView';
import { ReservationsView } from './ReservationView';
import { IconBadge } from '../../common/components/IconBadge/IconBadge';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';
import { useCustomParams } from '../../hooks/useCustomParams';
import { useAppSelector } from '../../store/store';

export const UserPanelLayout: React.FC = () => {
	const { panelSection } = useCustomParams(['panelSection']);

	const sections = [
		{
			name: 'information',
			label: 'Información personal',
			icon: FiUser,
			description: 'Actualiza la información de tu perfil a enviar al restaurante al hacer una reserva',
			component: InformationView,
		},
		{
			name: 'bookings',
			label: 'Mis reservas',
			icon: FiBookOpen,
			description: 'Aquí podrás gestionar y ver tus reservas.',
			component: ReservationsView,
		},
		{
			name: 'list',
			label: 'Guardados',
			icon: FiBookmark,
			description: 'Aquí podrás gestionar tus restaurantes guardados',
			component: ListsView,
		},
		{
			name: 'ratings',
			label: 'Mis reseñas',
			icon: FiMessageSquare,
			description: 'Aquí podrás gestionar y ver tus reseñas.',
			component: RatingsView,
		},
	];

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
		<VStack
			spacing="1rem"
			align="stretch"
			padding="1rem"
			borderRight="1px solid"
			borderRightColor="brand-gray.200"
			h="100%"
		>
			<HStack minH="3rem">
				<Avatar size="md" src={userData?.avatar_url ?? undefined} />
				<VStack align="stretch" spacing={0}>
					<Text textStyle="body1" fontWeight="medium" color="gray.900">
						{`${userData?.firstname} ${userData?.lastname}`}
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
				{menuItems.map((item, index) => (
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
