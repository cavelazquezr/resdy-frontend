import React from 'react';

import './styles.css';

import {
	Avatar,
	Button,
	Flex,
	Text,
	HStack,
	Img,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	VStack,
	Box,
	Icon,
	Select,
	Input,
} from '@chakra-ui/react';
import { FiBookOpen, FiBookmark, FiLogOut, FiMessageSquare, FiUser } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import resdyLogoPrimary from '../../assets/Resdy.svg';
import resdyForRestaurant from '../../assets/ResdyForRestaurant.svg';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';
import { useAppSelector } from '../../store/store';
import { UserRecord } from '../../types/user';
import { breakpointLayoutWidth } from '../Layout/utils/styles';

export const Topbar: React.FC = () => {
	const authenticatedUser = useAppSelector((state) => state.user.userData?.data);
	const location = useLocation();
	const isRestautantView = location.pathname.includes('/restaurant');
	const isDiscoverView = location.pathname.includes('/discover');

	return (
		<Flex w="100%" justifyContent="center" py="0.5rem" bg={isRestautantView ? 'brand-primary.default' : 'white'}>
			<HStack py="0.75rem" justifyContent="space-between" w={breakpointLayoutWidth}>
				{!isDiscoverView && (
					<SuperLink to="/">
						<Img src={isRestautantView ? resdyForRestaurant : resdyLogoPrimary} />
					</SuperLink>
				)}
				<Flex position="fixed" justifyContent="center" zIndex={3} top="0.5rem">
					<Flex width={breakpointLayoutWidth} justify="end">
						<HStack
							className="topbar-background"
							justifyContent="end"
							padding="0.5rem"
							spacing="1rem"
							borderRadius="full"
						>
							<HStack borderRight="1px solid" borderRightColor="brand-gray.200" pe="1rem">
								<Select placeholder="Madrid" border="none" w="8rem" />
							</HStack>
							<HStack borderRight="1px solid" borderRightColor="brand-gray.200" pe="1rem">
								<Input placeholder="Buscar" border="none" />
								<Button variant="default-light" size="sm" w="7rem">
									Buscar
								</Button>
							</HStack>
							{authenticatedUser ? (
								<UserMenu user={authenticatedUser} />
							) : (
								<SuperLink to="/login">
									<Button variant="primary" size="sm" w="7rem">
										Ingresar
									</Button>
								</SuperLink>
							)}
						</HStack>
					</Flex>
				</Flex>
			</HStack>
		</Flex>
	);
};

const UserMenu: React.FC<{ user: UserRecord }> = (props) => {
	const { user } = props;
	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		window.location.reload();
	};
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
		<Box position="relative" zIndex="2">
			<Menu placement="bottom-end">
				<MenuButton>
					<Avatar size="sm" src={user.avatar_url ?? 'https://bit.ly/broken-link'} />
				</MenuButton>
				<MenuList w="fit-content" p="1rem">
					<VStack>
						<Avatar size="md" src={user.avatar_url ?? 'https://bit.ly/broken-link'} />
						<Text textStyle="body1" color="gray.700">{`${user.firstname} ${user.lastname}`}</Text>
					</VStack>
					<Box mx="-1rem">
						<MenuDivider />
					</Box>
					{menuItems.map((item, index) => (
						<SuperLink to={item.path} key={index}>
							<MenuItem gap="1rem" borderRadius="0.3rem">
								<Icon as={item.icon} />
								<Text textDecoration="none" textStyle="body1" color="gray.700">
									{item.label}
								</Text>
							</MenuItem>
						</SuperLink>
					))}
					<Box mx="-1rem">
						<MenuDivider />
					</Box>
					<MenuItem gap="1rem" borderRadius="0.3rem" onClick={handleLogout}>
						<Icon as={FiLogOut} />
						<Text textDecoration="none" textStyle="body1" color="gray.700">
							Cerrar sesión
						</Text>
					</MenuItem>
				</MenuList>
			</Menu>
		</Box>
	);
};
