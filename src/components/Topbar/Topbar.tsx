import React from 'react';

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
	Stack,
	Slide,
	Fade,
	Divider,
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
} from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import './styles.css';

import resdyLogoPrimary from '../../assets/Resdy.svg';
import resdyForRestaurant from '../../assets/ResdyForRestaurant.svg';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';
import { UserAvatar } from '../../common/components/UserAvatar/UserAvatar';
import { useAppSelector } from '../../store/store';
import { UserRecord } from '../../types/user';
import { breakpointLayoutWidth } from '../Layout/utils/styles';

const userMenuItems = [
	{ label: 'Información personal', icon: FiUser, path: '/admin/information' },
	{ label: 'Mis reservas', icon: FiBookOpen, path: '/admin/bookings' },
	{ label: 'Guardados', icon: FiBookmark, path: '/admin/list' },
	{ label: 'Mis reseñas', icon: FiMessageSquare, path: '/admin/ratings' },
];
const adminMenuItems = [
	{ label: 'Información', icon: FiInfo, path: '/admin/information' },
	{ label: 'Personalización', icon: FiImage, path: '/admin/password' },
	{ label: 'Reservas', icon: FiBookOpen, path: '/admin/bookings' },
	{ label: 'Reseñas', icon: FiMessageSquare, path: '/admin/ratings' },
	{ label: 'Menú', icon: FiClipboard, path: '/admin/menu' },
];
const nonAuthenticatedMenuItems = [{ label: 'Ingresar', icon: FiUser, path: '/login' }];

export const Topbar: React.FC = () => {
	const authenticatedUser = useAppSelector((state) => state.user.userData?.data);
	const location = useLocation();
	const isRestautantView = location.pathname.includes('/restaurant');
	const isDiscoverView = location.pathname.includes('/discover');
	const { isOpen, onOpen, onClose } = useDisclosure();

	const menuItems = authenticatedUser
		? authenticatedUser?.is_owner
			? adminMenuItems
			: userMenuItems
		: nonAuthenticatedMenuItems;

	React.useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	return (
		<Flex
			w="100%"
			position="relative"
			justifyContent="center"
			py="0.5rem"
			bg={isRestautantView ? 'brand-primary.default' : 'white'}
			alignItems="center"
		>
			<IconButton
				position="absolute"
				variant="ghost"
				left="2rem"
				borderRadius="0.5rem"
				height="3.5rem"
				w="3.5rem"
				size="lg"
				aria-label="open-menu"
				display={{ xs: 'none' }}
				onClick={isOpen ? onClose : onOpen}
			>
				<Icon as={FiMenu} fontSize="2rem" />
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
			<Slide in={isOpen} direction="left" style={{ zIndex: 11, width: '60%' }}>
				<Box h="100%">
					<Box id="menu" pb={4} bg="white" padding="2rem" w="100%" h="100%" zIndex={5}>
						{authenticatedUser ? (
							<Stack as={'nav'} spacing={4} w="100%">
								<VStack align="stretch" spacing="1rem">
									<UserAvatar size="lg" avatarPath={authenticatedUser.avatar_url ?? 'https://bit.ly/broken-link'} />
									<VStack align="stretch" spacing={0}>
										<Text textStyle="body1" fontWeight="medium" color="gray.900">{`${authenticatedUser.firstname} ${
											authenticatedUser.lastname ?? ''
										}`}</Text>
										<Text textStyle="body2" color="gray.500">
											{authenticatedUser.email}
										</Text>
									</VStack>
								</VStack>
								<Divider />
								{menuItems.map((item, index) => (
									<SuperLink to={item.path} key={index}>
										<Flex gap="1rem" borderRadius="0.3rem" alignItems="center">
											<Icon as={item.icon} fontSize="1.5rem" />
											<Text textDecoration="none" textStyle="body1" color="gray.700">
												{item.label}
											</Text>
										</Flex>
									</SuperLink>
								))}
							</Stack>
						) : (
							<Stack as={'nav'} spacing={4} w="100%">
								{menuItems.map((item, index) => (
									<SuperLink to={item.path} key={index}>
										<Flex gap="1rem" borderRadius="0.3rem" alignItems="center">
											<Icon as={item.icon} fontSize="1.5rem" />
											<Text textDecoration="none" textStyle="body1" color="gray.700">
												{item.label}
											</Text>
										</Flex>
									</SuperLink>
								))}
							</Stack>
						)}
					</Box>
				</Box>
			</Slide>
			{isOpen && (
				<Fade in={isOpen} unmountOnExit style={{ zIndex: 10 }}>
					<Box
						position="fixed"
						zIndex={99}
						top="0"
						left="0"
						right="0"
						bottom="0"
						onClick={onClose}
						bg="rgba(0, 0, 0, 0.35)"
						backdropFilter="blur(5px)"
					/>
				</Fade>
			)}
		</Flex>
	);
};

const UserMenu: React.FC<{ user: UserRecord }> = (props) => {
	const { user } = props;
	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		window.location.reload();
	};

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
