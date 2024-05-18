import React from 'react';

import ReactMapGL from 'react-map-gl'; // Renamed import to avoid conflict

const accessToken = 'pk.eyJ1IjoiY2F2ZWxhenF1ZXpyIiwiYSI6ImNsZ3J5emR2dzBmZ2MzZWw4czh6bWR4djcifQ.LupXJZIZBg7nmPn4q5kwQQ';
const style = 'mapbox://styles/cavelazquezr/clw9pthn402vl01qv4ozc838u';

const MapBox: React.FC = () => {
	return (
		<ReactMapGL
			mapboxAccessToken={accessToken}
			initialViewState={{
				longitude: -122.4,
				latitude: 37.8,
				zoom: 14,
			}}
			style={{ width: '100%', height: '100vh' }}
			mapStyle={style}
		/>
	);
};

export default MapBox;
