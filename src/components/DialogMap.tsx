// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Slide from "@mui/material/Slide";
// import { TransitionProps } from "@mui/material/transitions";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// const Transition = React.forwardRef(function Transition(
// 	props: TransitionProps & {
// 		children: React.ReactElement;
// 	},
// 	ref: React.Ref<unknown>
// ) {
// 	return <Slide direction="up" ref={ref} {...props} />;
// });

// interface Props {
// 	description: string;
// 	title: string;
// 	open: boolean;
// 	close: () => void;
// 	accept: (lat: number, lng: number) => void;
// }

// export function AlertDialogSlideMap({ title, open, close, accept }: Props) {
// 	const [position, setposition] = React.useState<LatLngExpression>({
// 		lat: 22.40694,
// 		lng: -79.96472,
// 	});
// 	const handle = (lat: number, lng: number) => {
// 		close();
// 		accept(lat, lng);
// 	};

// 	return (
// 		<div>
// 			<Dialog
// 				open={open}
// 				TransitionComponent={Transition}
// 				keepMounted
// 				onClose={close}
// 				aria-describedby="alert-dialog-slide-description"
// 			>
// 				<DialogTitle>{title}</DialogTitle>
// 				<DialogContent>
// 					<DialogContentText id="alert-dialog-slide-description">
// 						<MapContainer
// 							center={position}
// 							zoom={13}
// 							scrollWheelZoom={false}
// 							className="mapa"
// 						>
// 							<TileLayer
// 								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// 							/>
// 							<Marker
// 								draggable
// 								eventHandlers={{
// 									move: (e) => {
// 										const latLng = (e as any).latlng;
// 										setposition({ ...latLng });

// 									},
// 									moveend: (e) => {
// 										console.log("Movie EN", e);
// 									},
// 								}}
// 								position={position as LatLngExpression}
// 							>
// 								<Popup>
// 									A pretty CSS3 popup. <br /> Easily
// 									customizable.
// 								</Popup>
// 							</Marker>
// 						</MapContainer>
// 					</DialogContentText>
// 				</DialogContent>
// 				<DialogActions>
// 					<Button onClick={close}>No</Button>
// 					<Button
// 						onClick={() => {
// 							handle(
// 								(position as any).lat,
// 								(position as any).lng
// 							);
// 						}}
// 					>
// 						Sì
// 					</Button>
// 				</DialogActions>
// 			</Dialog>
// 		</div>
// 	);
// }
