import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Authenticator } from './components/Authenticator/Authenticator';
import { Router } from './config/routes';
import { theme } from './config/theme/theme';
import { store } from './store/store';

export const App: React.FC = () => {
	const queryClient = new QueryClient();
	return (
		<BrowserRouter>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<Authenticator>
						<ChakraProvider theme={theme}>
							<Router />
						</ChakraProvider>
					</Authenticator>
				</QueryClientProvider>
			</Provider>
		</BrowserRouter>
	);
};
