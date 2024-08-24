import React from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapGL, { GeolocateControl, Marker, useMap } from 'react-map-gl'; // Renamed import to avoid conflict

import { MapPopup } from './MapPopup';
import { RestaurantCardOutput } from '../../../types/common';
import { MapBoundsRecord } from '../../../types/map';

const accessToken = 'pk.eyJ1IjoiY2F2ZWxhenF1ZXpyIiwiYSI6ImNsZ3J5emR2dzBmZ2MzZWw4czh6bWR4djcifQ.LupXJZIZBg7nmPn4q5kwQQ';
const style = 'mapbox://styles/mapbox/streets-v12';

export type MarkerProps = {
	detail: RestaurantCardOutput<unknown>;
	latitude: number;
	longitude: number;
	hovered?: boolean;
	selected: boolean;
};

export type CustomViewportChangeEvent = {
	hasBoundsResults: boolean;
	bounds: MapBoundsRecord;
};

interface IProps {
	id?: string;
	markersCoordinates?: Array<MarkerProps>;
	onNoBoundsResults?: (e: CustomViewportChangeEvent) => void;
	onViewportChange?: (e: CustomViewportChangeEvent) => void;
}

export const MapBox: React.FC<IProps> = (props) => {
	const { id, markersCoordinates, onNoBoundsResults, onViewportChange } = props;
	const maps = useMap();
	const currentMap = maps[id ?? 'current'];

	const [event, setEvent] = React.useState<CustomViewportChangeEvent | null>(null);

	const hasBoundResults = () => {
		if (currentMap) {
			const bounds = currentMap.getBounds();
			if (bounds) {
				const sw = bounds.getSouthWest();
				const ne = bounds.getNorthEast();

				const markersInsideBounds = markersCoordinates?.filter((marker) => {
					return (
						marker.latitude >= sw.lat &&
						marker.latitude <= ne.lat &&
						marker.longitude >= sw.lng &&
						marker.longitude <= ne.lng
					);
				});

				return markersInsideBounds && markersInsideBounds?.length > 0;
			}
		}
		return false;
	};

	const onChangeViewport = () => {
		if (currentMap && currentMap.getBounds()) {
			const bounds = currentMap.getBounds();
			if (bounds) {
				setEvent({
					hasBoundsResults: hasBoundResults() ?? false,
					bounds: {
						sw: {
							lat: bounds.getSouthWest().lat,
							lng: bounds.getSouthWest().lng,
						},
						ne: {
							lat: bounds.getNorthEast().lat,
							lng: bounds.getNorthEast().lng,
						},
					},
				});
			}
		}
	};

	React.useEffect(() => {
		if (event) {
			if (onNoBoundsResults) {
				onNoBoundsResults(event);
			}
			if (onViewportChange) {
				onViewportChange(event);
			}
		}
	}, [event]);

	const calculateAverageCoordinates = (markers: Array<MarkerProps>) => {
		if (markers.length === 0) {
			return { latitude: 40.41831, longitude: -3.70275 }; // Default coordinates if no markers
		}

		const total = markers.reduce(
			(acc, marker) => {
				acc.latitude += marker.latitude;
				acc.longitude += marker.longitude;
				return acc;
			},
			{ latitude: 0, longitude: 0 },
		);

		return {
			latitude: total.latitude / markers.length,
			longitude: total.longitude / markers.length,
		};
	};

	const averageCoordinates = calculateAverageCoordinates(markersCoordinates || []);

	const handleMapLoad = () => {
		onChangeViewport(); // Set initial values once the map has loaded
	};

	return (
		<ReactMapGL
			id={id ?? 'map'}
			onLoad={handleMapLoad}
			onDragEnd={onChangeViewport}
			onZoomEnd={onChangeViewport}
			minZoom={12}
			mapboxAccessToken={accessToken}
			initialViewState={{
				longitude: averageCoordinates.longitude,
				latitude: averageCoordinates.latitude,
				zoom: 15,
			}}
			style={{ width: '100%', height: '100vh' }}
			mapStyle={style}
		>
			<GeolocateControl />
			{markersCoordinates &&
				markersCoordinates.length > 0 &&
				markersCoordinates.map(({ longitude, latitude, detail, hovered }, index) => (
					<Marker key={index + 1} longitude={longitude} latitude={latitude}>
						<MapPopup detail={detail} isHovered={hovered ?? false} />
					</Marker>
				))}
		</ReactMapGL>
	);
};
