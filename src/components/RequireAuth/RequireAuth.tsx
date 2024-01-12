import React from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireAuth: React.FC = () => {
	const storedToken = localStorage.getItem('accessToken');
	const location = useLocation();
	return storedToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
