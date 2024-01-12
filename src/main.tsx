import React from 'react';

import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';

import '@fontsource/poppins/500.css';
import '@fontsource/open-sans';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
