import React from 'react';

import { getMyRestaurantThunk } from '../../store/restaurant/thunk';
import { useAppDispatch } from '../../store/store';
import { logoutUser } from '../../store/user/reducer';
import { getCurrentUserThunk } from '../../store/user/thunk';

interface IProps {
	children: React.ReactNode;
}

export const Authenticator: React.FC<IProps> = (props) => {
	const dispatch = useAppDispatch();
	const handleStorageChange = (event) => {
		if (event.key === 'accessToken' && event.newValue === null) {
			// Token has been removed from localStorage, perform logout or other actions
			dispatch(logoutUser());
		}
	};

	React.useEffect(() => {
		// Check for the presence of the token in localStorage during application initialization
		const storedToken = localStorage.getItem('accessToken');

		if (storedToken) {
			// Dispatch an action or perform any logic to authenticate using the stored token
			dispatch(getCurrentUserThunk());
			dispatch(getMyRestaurantThunk());
		}
	}, [dispatch]);

	React.useEffect(() => {
		// Add an event listener to watch changes in localStorage
		window.addEventListener('storage', handleStorageChange);

		return () => {
			// Remove the event listener when the component is unmounted
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []); // Empty dependency array to run the effect once on mount

	return <React.Fragment>{props.children}</React.Fragment>;
};
