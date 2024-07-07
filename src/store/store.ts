import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import mapNavigationReducer from './mapNavigation/reducer';
import restaurantReducer from './restaurant/reducer';
import userReducer from './user/reducer';

export const store = configureStore({
	reducer: {
		user: userReducer,
		mapNavigation: mapNavigationReducer,
		restaurant: restaurantReducer,
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
