import React from 'react';

import { AdminPanelLayout } from './AdminPanel';
import { UserPanelLayout } from './UserPanel';
import { useAppSelector } from '../../store/store';

export const SettingsPanelLayout: React.FC = () => {
	const user = useAppSelector((state) => state.user.userData?.data);

	const isAdmin = user?.is_owner;

	if (isAdmin) {
		return <AdminPanelLayout />;
	} else {
		return <UserPanelLayout />;
	}
};
