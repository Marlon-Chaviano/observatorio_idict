import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { NestedList } from "./ListEstadistica";

function PaperComponent(props: PaperProps) {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}

interface Props {
	open: boolean;
	handleClose: () => void;
}

export const DraggableDialog = ({ open, handleClose }: Props) => {
	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title"
			>
				<DialogTitle
					style={{ cursor: "move" }}
					id="draggable-dialog-title"
				>
					Estadisticas
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<NestedList />
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Cerrar
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};
