import React from 'react';

import { Outlet, Route, Routes } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { RequireAuth } from '../../components/RequireAuth/RequireAuth';
import { AuthenticationView } from '../../views/Authentication/AuthenticationView';
import { RestaurantCreationView } from '../../views/Authentication/RestaurantCreationView';
import { DiscoverView } from '../../views/Discover';
import { LandingView } from '../../views/Landing';
import { RestaurantLayout } from '../../views/Restaurant';
import { UserPanelLayout } from '../../views/UserPanel';

export const Router: React.FC = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout>
						<Outlet />
					</Layout>
				}
			>
				{/* Public routes */}
				<Route path="/" element={<LandingView />} />
				<Route path="/discover" element={<DiscoverView />} />
				<Route path="/login" element={<AuthenticationView loginView />} />
				<Route path="/register" element={<AuthenticationView />} />
				<Route path="/register-restaurant" element={<RestaurantCreationView />} />
				{/* Restaurant views */}
				<Route path="/restaurant" element={<Outlet />}>
					<Route path=":restaurantName/:restaurantSection" element={<RestaurantLayout />} />
				</Route>
				{/* Protected routes */}
				<Route element={<RequireAuth />}>
					<Route path="userpanel" element={<Outlet />}>
						<Route path=":panelSection" element={<UserPanelLayout />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
};
