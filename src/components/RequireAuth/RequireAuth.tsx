import React, { useEffect, useState } from 'react';

import { Box } from '@chakra-ui/react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { getCurrentUser } from '../../api/authentication';

export const RequireAuth: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const location = useLocation();

	const renderPrivateView = async () => {
		setIsLoading(true);
		const storedToken = localStorage.getItem('accessToken');
		if (storedToken) {
			const currentUser = await getCurrentUser(storedToken);
			setIsLoading(false);
			if (currentUser) {
				setAuthenticated(true);
			}
		}
		setIsLoading(false);
	};

	useEffect(() => {
		renderPrivateView();
	}, []);

	if (isLoading) {
		return <Box>Loading...</Box>;
	}

	return authenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
