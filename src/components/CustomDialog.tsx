import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
	description: string;
	title: string;
	open: boolean;
	close: () => void;
	accept: () => void;
}

export function AlertDialogSlide({
	description,
	title,
	open,
	close,
	accept,
}: Props) {
	const handle = () => {
		close();
		accept();
	};

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={close}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{description}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={close}>No</Button>
					<Button onClick={handle}>Sì</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
