import * as React from "react";
import Box from "@mui/material/Box";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
	GridRowsProp,
	GridRowModesModel,
	GridRowModes,
	DataGrid,
	GridColDef,
	GridActionsCellItem,
	GridEventListener,
	GridRowId,
	GridRowModel,
	GridRowEditStopReasons,
	GridToolbar,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { AlertDialogSlide } from "./CustomDialog";
import { useNavigate } from "react-router-dom";
import { observatory } from "../context";
import { formatData } from "../const/functions";
import { axiosInstance } from "../config/axios";
import { CustomizedSnackbars, TYPE_MESSAGES } from "./MessageAlerts";

export type registrosProps = {
	id: number;
	header: string;
	metadata: string;
	fuente: number;
};

export type Patentes = {
	id: string;
	abstract: string;
	description: string;
	claims: string;
	patent_office: string;
	url: string;
};

// type itemProps = {
//   id: string;
//   title: string;
//   creators: string;
//   subject: string;
//   description: string;
//   publisher: string;
//   date: string;
//   type: string;
//   format: string;
//   identifier: string;
//   language: string;
//   rights: string;
//   source: string;
//   relation: string;
// };

export default function FullFeaturedCrudGrid() {
	const nav = useNavigate();
	const { registros } = React.useContext(observatory);
	if (!registros) nav("/error");
	const formatedData = registros.map((item: registrosProps) =>
		formatData(item)
	);

	const ROWS_REGISTROS: GridRowsProp = formatedData.map((item) => {
		return {
			id: item.id,
			autor: item?.creators,
			titulo: item?.title,
			fecha: item?.date,
			editorial: item?.publisher,
			materia: item?.subject,
			organizacion: item?.source,
			lugardeOrganizacion: item?.description,
		};
	});

	console.log(ROWS_REGISTROS);
	const [rows, setRows] = React.useState(ROWS_REGISTROS);
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

	// const handleEditClick = (id: GridRowId) => () => {
	//   setRowModesModel({
	//     ...rowModesModel,
	//     [id]: { mode: GridRowModes.Edit },
	//   });
	// };

	const [open, setopen] = React.useState(false);
	// const [openEdit, setOpenEdit] = React.useState(false);
	const idSelected = React.useRef<GridRowId>();
	// const idSelecteMap = React.useRef<GridRowId>();
	const handleClose = () => {
		setopen(false);
	};

	const [openSnack, setOpenSnack] = React.useState({
		status: false,
		message: "",
		type: "",
	});

	const handleOpenDialog = (id: GridRowId) => () => {
		idSelected.current = id;
		setopen(true);
	};

	// const handleOpenMap = (id: GridRowId) => {
	//   idSelecteMap.current = id;
	//   setOpenEdit(true);
	// };

	const handleDelete = () => {
		console.log(idSelected);
		const formData = new FormData();
		formData.append("id_registro", String(idSelected.current));

		try {
			axiosInstance.post("registros/delete", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setOpenSnack({
				status: true,
				message: "Registro Eliminado Correctamente",
				type: "SUCCESS",
			});
		} catch (error) {
			setOpenSnack({
				status: true,
				message:
					"Error insesperado , intente de nuevo sino contacte a un admin",
				type: "ERROR",
			});
		}
		setRows(rows.filter((row) => row.id !== idSelected.current));
	};

	// const handleEdit = (lat: number, lng: number) => {
	//   const index = rows.findIndex((e) => e.id == idSelecteMap.current);
	//   rows[index].lugardeOrganizacion = `${lat} + - + ${lng}`;
	// };

	const processRowUpdate = (newRow: GridRowModel) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	React.useEffect(() => {
		const usernew = JSON.parse(localStorage.getItem("user") as string);
		if (!usernew) {
			nav("/", {
				replace: true,
			});
		}
	}, [nav]);

	const columns: GridColDef[] = [
		{
			field: "actions",
			type: "actions",
			headerName: "Acciones",
			width: 100,
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
							// onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							// onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					// <GridActionsCellItem
					//   icon={<EditIcon/>}
					//   label="Edit"
					//   className="textPrimary"
					//   onClick={() => handleEditClick(id)}
					//   color="inherit"
					// />,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleOpenDialog(id)}
						color="inherit"
					/>,
				];
			},
		},
		{ field: "autor", headerName: "Autor", minWidth: 150, editable: true },
		{
			field: "titulo",
			headerName: "Título",
			minWidth: 150,
			editable: true,
		},
		{ field: "fecha", headerName: "Fecha", minWidth: 150, editable: true },
		{
			field: "editorial",
			headerName: "Editorial",
			minWidth: 150,
			editable: true,
		},
		{
			field: "materia",
			headerName: "Materia",
			minWidth: 150,
			editable: true,
		},
		{
			field: "organizacion",
			headerName: "Organización",
			minWidth: 180,
			editable: true,
		},
		{
			field: "lugardeOrganizacion",
			headerName: "Descripción",
			minWidth: 180,
			editable: true,
		},
	];

	const { data, loading } = useDemoData({
		dataSet: "Commodity",
		rowLength: 4,
		maxColumns: 6,
	});

	return (
		<>
			<Box
				sx={{
					marginTop: 0,
					marginBottom: 20,
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
					{...data}
					loading={loading}
					rows={rows}
					columns={columns}
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
					processRowUpdate={processRowUpdate}
					slots={{
						toolbar: GridToolbar,
					}}
					slotProps={{
						toolbar: { setRows, setRowModesModel },
					}}
				/>
				<AlertDialogSlide
					title="Desea borrar el elemento?"
					description="Desea borrar el autor"
					// description={`Desea borrar el autor ${
					//   rows[Number(idSelected.current) || 0].autor
					// }`}
					open={open}
					close={handleClose}
					accept={handleDelete}
				/>
				{/* <AlertDialogSlideMap
          description=""
          title="Mapa"
          accept={(lat, lng) => {
            handleEdit(lat, lng);

            setOpenEdit(false);
          }}
          open={openEdit}
          close={() => {
            setOpenEdit(false);
          }}
        /> */}

				<CustomizedSnackbars
					open={openSnack.status}
					message={openSnack.message}
					type={
						openSnack.type == "SUCCESS"
							? TYPE_MESSAGES.SUCCESS
							: TYPE_MESSAGES.INFO
					}
					closeFunction={() => {
						setOpenSnack({
							status: false,
							message: "",
							type: "",
						});
					}}
				/>
			</Box>
		</>
	);
}
