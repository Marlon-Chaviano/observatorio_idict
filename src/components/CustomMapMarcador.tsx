// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Box } from "@mui/material";
// import { LatLngExpression } from "leaflet";
// import React from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// export const CustomMapMarcador = () => {
// 	const [position, setposition] = React.useState<LatLngExpression>({
// 		lat: 22.40694,
// 		lng: -79.96472,
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
// 			</MapContainer>
// 		</Box>
// 	);
// };
