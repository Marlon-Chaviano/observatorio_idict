/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
	GridRowModesModel,
	GridRowModes,
	DataGrid,
	GridColDef,
	GridActionsCellItem,
	GridEventListener,
	GridRowId,
	GridRowModel,
	GridRowEditStopReasons,
} from "@mui/x-data-grid";

import { UserDB } from "../interfaces/user";
import { AlertDialogSlide } from "./AlertDialog";
import { CustomizedSnackbars, TYPE_MESSAGES } from "./MessageAlerts";
import { axiosInstance } from "../config/axios";

export const TableUserEditable = () => {
	const [users, setusers] = React.useState<UserDB[]>([]);
	const [openDialog, setopenDialog] = React.useState<boolean>(false);
	const [openDialogDeleted, setopenDialogDeleted] =
		React.useState<boolean>(false);
	const [openSnack, setopenSnack] = React.useState({
		status: TYPE_MESSAGES.NOT_STATUS,
		message: "",
	});

	const refRowValidModel = React.useRef<GridRowModel | null>(null);
	const refRowVaalidId = React.useRef<GridRowId | null>(null);

	const handleCloseDialogDeleted = () => {
		setopenDialogDeleted(false);
	};
	const handleClosedialog = () => {
		setopenDialog(false);
	};

	const processRowUpdate = (newRow: GridRowModel) => {
		const updatedRow = { ...newRow, isNew: false };
		handleEditUser(newRow);
		return updatedRow;
	};

	const getMessages = (message: string) => {
		if (message.startsWith("username")) return "Nombre es requerido";
		if (message.startsWith("lastName")) return "Apellido es requerido";
		if (message.startsWith("password")) return "Contraseña inválida";
		if (message.startsWith("email")) return "Correo Inválido";
		if (message.startsWith("organismo")) return "Organismo es requerido";
		if (message.startsWith("address")) return "Dirección es requerido";
		if (message.startsWith("El Nombre no puede")) return message;
		if (message.startsWith("El Apellido no puede")) return message;
		if (message.startsWith("Key") || message.startsWith("Ya existe"))
			return message.replace("Key", "").replace("(email)=", "");
		return "Error en el formulario contacte al administrador";
	};

	const handleEditUser = async (newRow: GridRowModel) => {
		console.log(newRow);
		try {
			const formData = new FormData();
			formData.append("apellido", newRow.apellido);
			formData.append("id_usuario", newRow.id);
			formData.append("nombre", newRow.name);
			formData.append("organismo", newRow.organismo);
			formData.append("direccion", newRow.direccion);
			formData.append("email", newRow.email);
			formData.append("provincia", newRow.provincia);
			formData.append("municipio", newRow.municipio);
			formData.append("is_superuser", newRow.is_superuser ? "1" : "0");
			axiosInstance.post("users/update", formData, {
				headers: {
					"Content-Type": "multipart/form-data", // Esto es importante para enviar FormData
				},
			});
			delete newRow.isDeleted;
			delete newRow.isNew;

			setRowModesModel({
				...rowModesModel,
				[newRow.id]: { mode: GridRowModes.View },
			});
			setopenSnack({
				status: TYPE_MESSAGES.SUCCESS,
				message: "Registro actualizado correctamente",
			});
			return newRow;
		} catch (error: any) {
			if (error && error.response && error.response.data) {
				const data = error.response.data;
				const message = Array.isArray(data.message)
					? data.message[0]
					: data.message;
				setopenSnack({
					status: TYPE_MESSAGES.ERROR,
					message: getMessages(message),
				});
			} else {
				setopenSnack({
					status: TYPE_MESSAGES.ERROR,
					message: "Error desconocido hable con el administrador",
				});
			}
		}
	};

	const handleRemoveById = async (id: string) => {
		console.log(id);
		const formData = new FormData();
		formData.append("id_usuario", id);
		try {
			axiosInstance.post("users/delete", formData);
			setopenSnack({
				status: TYPE_MESSAGES.SUCCESS,
				message: "Usuario eliminado correctamente",
			});
		} catch (error) {
			setopenSnack({
				status: TYPE_MESSAGES.ERROR,
				message: "Error desconocido hable con el administrador",
			});
		}
		handleCloseDialogDeleted();
	};

	React.useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch("/src/data/users.json").then((res) => res.json());
			setusers(res);
		};
		fetchUsers();
	}, []);

	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
		{}
	);

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (
		params,
		event
	) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.Edit },
		});
	};

	const handleSaveClick = (id: GridRowId) => () => {
		refRowValidModel.current = users.find((user) => user.id === id) || null;
		setopenDialog(true);
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		refRowVaalidId.current = id;
		setopenDialogDeleted(true);
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
		// const editedRow = users.find((user) => user.id === id);
		// if (editedRow!.isNew) {
		//   setusers(users.filter((user) => user.id !== id));
		// }
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: GridColDef[] = [
		{ editable: true, field: "name", headerName: "Nombre", width: 90 },
		{
			editable: true,
			field: "apellido",
			headerName: "Apellido",
			width: 140,
		},
		{
			editable: true,
			field: "email",
			headerName: "Correo",
			type: "string",
			width: 140,
		},
		{
			editable: true,
			field: "provincia",
			headerName: "Provincia",
			type: "string",
			width: 90,
		},
		{
			editable: true,
			field: "municipio",
			headerName: "Municipio",
			type: "string",
			width: 140,
		},
		{
			editable: true,
			field: "organismo",
			headerName: "Organismo",
			sortable: false,
			width: 90,
		},
		{
			field: "is_superuser",
			headerName: "Admin",
			type: "singleSelect",
			sortable: false,
			width: 90,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 80,
			cellClassName: "actions",
			getActions: ({ id }) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							sx={{
								color: "primary.main",
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];
	const handleClose = (
		_event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") return;
		setopenSnack({ ...openSnack, status: TYPE_MESSAGES.NOT_STATUS });
	};

	return (
		<Box
			sx={{
				height: 500,
				width: "100%",
				"& .actions": {
					color: "text.secondary",
				},
				"& .textPrimary": {
					color: "text.primary",
				},
			}}
		>
			<DataGrid
				rows={users}
				columns={columns}
				editMode="row"
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				slotProps={{
					toolbar: { users, setusers },
				}}
			/>
			<AlertDialogSlide
				message={"Desea actualizar el usuario"}
				open={openDialog}
				handleClose={handleClosedialog}
				handleAction={processRowUpdate}
				row={refRowValidModel.current!}
			/>
			<AlertDialogSlide
				message={"Desea Eliminar el usuario"}
				open={openDialogDeleted}
				handleClose={handleCloseDialogDeleted}
				handleDelete={handleRemoveById}
				id={refRowVaalidId.current!}
			/>
			<CustomizedSnackbars
				open={openSnack.status !== TYPE_MESSAGES.NOT_STATUS}
				message={openSnack.message}
				type={openSnack.status}
				closeFunction={handleClose}
			/>
		</Box>
	);
};
