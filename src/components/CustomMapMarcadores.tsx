// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Box } from "@mui/material";
// import { LatLngExpression } from "leaflet";
// import React from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// export const CustomMapMarcadores = () => {
// 	const [position, setposition] = React.useState<LatLngExpression>({
// 		lat: 22.40694,
// 		lng: -79.96472,
// 	});
// 	const [position1, setposition1] = React.useState<LatLngExpression>({
// 		lat: 22.40694,
// 		lng: -79.96472,
// 	});
// 	const [position2, setposition2] = React.useState<LatLngExpression>({
// 		lat: 22.40694,
// 		lng: -79.96472,
// 	});
// 	const [position3, setposition3] = React.useState<LatLngExpression>({
// 		lat: 22.40698,
// 		lng: -79.96478,
// 	});
// 	// const handle = (lat: number, lng: number) => {
// 	// 	close();
// 	// 	accept(lat, lng);
// 	// };
// 	return (
// 		<Box display="flex" flexDirection="column" height="100vh">
// 			<MapContainer
// 				center={position}
// 				zoom={13}
// 				scrollWheelZoom={false}
// 				className="mapFull"
// 			>
// 				<TileLayer
// 					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// 				/>
// 				<Marker
// 					draggable
// 					eventHandlers={{
// 						move: (e) => {
// 							const latLng = (e as any).latlng;
// 							setposition({ ...latLng });
// 						},
// 						moveend: () => {},
// 					}}
// 					position={position as LatLngExpression}
// 				>
// 					<Popup>
// 						A pretty CSS3 popup. <br /> Easily customizable.
// 					</Popup>
// 				</Marker>
// 				<Marker
// 					draggable
// 					eventHandlers={{
// 						move: (e) => {
// 							const latLng = (e as any).latlng;
// 							setposition1({ ...latLng });
// 						},
// 						moveend: () => {},
// 					}}
// 					position={position1 as LatLngExpression}
// 				>
// 					<Popup>
// 						A pretty CSS3 popup. <br /> Easily customizable.
// 					</Popup>
// 				</Marker>
// 				<Marker
// 					draggable
// 					eventHandlers={{
// 						move: (e) => {
// 							const latLng = (e as any).latlng;
// 							setposition2({ ...latLng });
// 						},
// 						moveend: () => {},
// 					}}
// 					position={position2 as LatLngExpression}
// 				>
// 					<Popup>
// 						A pretty CSS3 popup. <br /> Easily customizable.
// 					</Popup>
// 				</Marker>
// 				<Marker
// 					draggable
// 					eventHandlers={{
// 						move: (e) => {
// 							const latLng = (e as any).latlng;
// 							setposition3({ ...latLng });
// 						},
// 						moveend: () => {},
// 					}}
// 					position={position3 as LatLngExpression}
// 				>
// 					<Popup>
// 						A pretty CSS3 popup. <br /> Easily customizable.
// 					</Popup>
// 				</Marker>
// 			</MapContainer>
// 		</Box>
// 	);
// };
