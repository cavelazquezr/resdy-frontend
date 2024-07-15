import React from 'react';

import './styles.css';

import {
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
	useDisclosure,
	IconButton,
} from '@chakra-ui/react';
import {
	FiBookOpen,
	FiBookmark,
	FiClipboard,
	FiImage,
	FiInfo,
	FiLogOut,
	FiMenu,
	FiMessageSquare,
	FiUser,
	FiX,
} from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import resdyLogoPrimary from '../../assets/Resdy.svg';
import resdyForRestaurant from '../../assets/ResdyForRestaurant.svg';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';
import { UserAvatar } from '../../common/components/UserAvatar/UserAvatar';
import { useAppSelector } from '../../store/store';
import { UserRecord } from '../../types/user';
import { breakpointLayoutWidth } from '../Layout/utils/styles';

export const Topbar: React.FC = () => {
	const authenticatedUser = useAppSelector((state) => state.user.userData?.data);
	const location = useLocation();
	const isRestautantView = location.pathname.includes('/restaurant');
	const isDiscoverView = location.pathname.includes('/discover');
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			w="100%"
			position="relative"
			justifyContent="center"
			py="0.5rem"
			bg={isRestautantView ? 'brand-primary.default' : 'white'}
		>
			<IconButton
				position="absolute"
				variant="default-light"
				left="2rem"
				size="lg"
				aria-label="open-menu"
				display={{ xs: 'none' }}
				onClick={isOpen ? onClose : onOpen}
			>
				<Icon as={isOpen ? FiX : FiMenu} />
			</IconButton>
			<HStack
				py="0.75rem"
				justifyContent={{
					base: 'center',
					xs: 'space-between',
				}}
				w={breakpointLayoutWidth}
			>
				{!isDiscoverView && (
					<SuperLink to="/">
						<Img src={isRestautantView ? resdyForRestaurant : resdyLogoPrimary} />
					</SuperLink>
				)}
				<Flex
					position="fixed"
					justifyContent="center"
					zIndex={3}
					top="0.5rem"
					display={{
						base: 'none',
						xs: 'flex',
					}}
				>
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
	const userMenuItems = [
		{
			label: 'Información personal',
			icon: FiUser,
			path: '/admin/information',
		},
		{
			label: 'Mis reservas',
			icon: FiBookOpen,
			path: '/admin/bookings',
		},
		{
			label: 'Guardados',
			icon: FiBookmark,
			path: '/admin/list',
		},
		{
			label: 'Mis reseñas',
			icon: FiMessageSquare,
			path: '/admin/ratings',
		},
	];
	const adminMenuItems = [
		{
			label: 'Información',
			icon: FiInfo,
			path: '/admin/information',
		},
		{
			label: 'Personalización',
			icon: FiImage,
			path: '/admin/password',
		},
		{
			label: 'Reservas',
			icon: FiBookOpen,
			path: '/admin/bookings',
		},
		{
			label: 'Reseñas',
			icon: FiMessageSquare,
			path: '/admin/ratings',
		},
		{
			label: 'Menú',
			icon: FiClipboard,
			path: '/admin/menu',
		},
	];

	const menuItems = user.is_owner ? adminMenuItems : userMenuItems;

	return (
		<Box position="relative" zIndex="2">
			<Menu placement="bottom-end">
				<MenuButton>
					<UserAvatar size="sm" avatarPath={user.avatar_url ?? 'https://bit.ly/broken-link'} />
				</MenuButton>
				<MenuList w="fit-content" p="1rem">
					<VStack>
						<UserAvatar size="md" avatarPath={user.avatar_url ?? 'https://bit.ly/broken-link'} />
						<Text textStyle="body1" color="gray.700">{`${user.firstname} ${user.lastname ?? ''}`}</Text>
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
