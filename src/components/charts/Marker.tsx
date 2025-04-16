// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { Marker, Popup } from "react-leaflet";

// const center = {
// 	lat: 51.505,
// 	lng: -0.09,
// };

// export function DraggableMarker() {
// 	// const [draggable, setDraggable] = React.useState(false);
// 	const [position, setPosition] = React.useState(center);
// 	const markerRef = React.useRef(null);
// 	const eventHandlers = React.useMemo(
// 		() => ({
// 			dragend() {
// 				const marker = markerRef.current;
// 				if (marker != null) {
// 					setPosition((marker as any).getLatLng());
// 				}
// 			},
// 		}),
// 		[]
// 	);
// 	// const toggleDraggable = React.useCallback(() => {
// 	// 	setDraggable((d) => !d);
// 	// }, []);

// 	return (
// 		<Marker
// 			// draggable={draggable}
// 			eventHandlers={eventHandlers}
// 			position={position}
// 			ref={markerRef}
// 		>
// 			{/* <Popup minWidth={90}>
// 				<span onClick={toggleDraggable}>
// 					{draggable
// 						? "Marker is draggable"
// 						: "Click here to make marker draggable"}
// 				</span>
// 			</Popup> */}
// 		</Marker>
// 	);
// }
