import React from 'react';

import { Outlet, Route, Routes } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { RequireAuth } from '../../components/RequireAuth/RequireAuth';
import { AuthenticationView } from '../../views/Authentication/AuthenticationView';
import { DiscoverView } from '../../views/Discover';
import { LandingView } from '../../views/Landing';
import { RestaurantLayout } from '../../views/Restaurant';
import { SettingsPanelLayout } from '../../views/SettingsPanel';

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
				<Route path="/login" element={<AuthenticationView />} />
				<Route path="/register" element={<AuthenticationView />} />
				<Route path="/create-restaurant" element={<AuthenticationView />} />
				{/* Restaurant views */}
				<Route path="/restaurant" element={<Outlet />}>
					<Route path=":restaurantName/:restaurantSection" element={<RestaurantLayout />} />
				</Route>
				{/* Protected routes */}
				<Route element={<RequireAuth />}>
					<Route path="admin" element={<Outlet />}>
						<Route path=":panelSection" element={<SettingsPanelLayout />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
};
