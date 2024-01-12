import React from 'react';

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
} from '@chakra-ui/react';
import { FiBookOpen, FiBookmark, FiLogOut, FiMessageSquare, FiUser } from 'react-icons/fi';

import resdyLogoPrimary from '../../assets/Resdy.svg';
import { SuperLink } from '../../common/components/SuperLink/SuperLink';
import { useAppSelector } from '../../store/store';
import { UserOutput } from '../../types/user';

export const Topbar: React.FC = () => {
	const authenticatedUser = useAppSelector((state) => state.user.userData?.data);
	return (
		<Flex w="100%" justifyContent="center" py="0.5rem">
			<HStack
				bg="white"
				py="0.5rem"
				justifyContent="space-between"
				w={{
					xs: '100%',
					sm: '840px',
					md: '1024px',
					lg: '1140px',
					xl: '1140px', // From here on, global font-size is 16px
					xxl: '1320px', // From here on, global font-size is 16px
				}}
			>
				<SuperLink to="/">
					<Img src={resdyLogoPrimary} />
				</SuperLink>
				{authenticatedUser ? (
					<UserMenu user={authenticatedUser} />
				) : (
					<SuperLink to="/login">
						<Button size="md" variant="solidPrimary">
							Ingresar
						</Button>
					</SuperLink>
				)}
			</HStack>
		</Flex>
	);
};

const UserMenu: React.FC<{ user: UserOutput }> = (props) => {
	const { user } = props;
	const handleLogout = () => {
		// Remove the token from localStorage
		localStorage.removeItem('accessToken');

		// Refresh the page to reflect the changes
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
					<Avatar size="md" src={user.avatar_url ?? 'https://bit.ly/broken-link'} />
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
