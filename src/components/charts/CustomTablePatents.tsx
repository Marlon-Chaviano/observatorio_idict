import * as React from "react";
import Box from "@mui/material/Box";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
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
// import { AlertDialogSlideMap } from "../DialogMap";
import { AlertDialogSlide } from "../CustomDialog";
import { observatory } from "../../context";
import { Patentes } from "../CustomTable";
import { axiosInstance } from "../../config/axios";
import { CustomizedSnackbars, TYPE_MESSAGES } from "../MessageAlerts";

// const ROWS: GridRowsProp = Array.from({ length: 100 }, () => {
// 	const id = randomId();
// 	return {
// 		id: id,
// 		autor: "Autor" + "-" + id,
// 		titulo: "Titulo" + "-" + id,
// 		fecha: Date.now().toLocaleString(),
// 		editorial: "Editorial" + "-" + id,
// 		materia: "Materia" + "-" + id,
// 		organizacion: "Organizacion" + "-" + id,
// 		lugardeOrganizacion: "LugarOrganizacion" + "-" + id,
// 	};
// });

export default function FullFeaturedCrudGridPatents() {
  const { patentes } = React.useContext(observatory);
  console.log(patentes);

  const ROWS_PATENTES: GridRowsProp = patentes?.map((item: Patentes) => {
    return {
      id: item?.id,
      titulo: item?.abstract,
      editorial: item?.description,
      materia: item?.claims,
      organizacion: item?.patent_office,
      lugardeOrganizacion: item?.url,
    };
  });
    const [openSnack, setOpenSnack] = React.useState({
    status: false,
    message: "",
    type: "",
  });
  const [rows, setRows] = React.useState(ROWS_PATENTES);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const [open, setopen] = React.useState(false);
  // const [openEdit, setOpenEdit] = React.useState(false);
  const idSelected = React.useRef<GridRowId>();
  // const idSelecteMap = React.useRef<GridRowId>();
  const handleClose = () => {
    setopen(false);
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // const handleEditClick = (id: GridRowId) => () => {
  // 	idSelected.current = id;
  // 	setRowModesModel({
  // 		...rowModesModel,
  // 		[id]: { mode: GridRowModes.Edit },
  // 	});
  // };

  const handleOpenDialog = (id: GridRowId) => () => {
    idSelected.current = id;
    setopen(true);
  };


  // const handleOpenMap = (id: GridRowId) => {
  //   idSelecteMap.current = id;
  //   // setOpenEdit(true);
  // };


  const handleDelete = () => {
    const formData = new FormData()
    console.log(idSelected.current);
    formData.append('id_patente', String(idSelected.current))


    try {
      axiosInstance.post('patentes/delete', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
       setOpenSnack({
        status: true,
        message: "Registro Eliminado Correctamente",
        type: "SUCCESS",
      });


    } catch (error) {
      setOpenSnack({
        status: true,
        message: "Error insesperado , intente de nuevo sino contacte a un admin",
        type: "ERROR",
      });
    }
    setRows(rows.filter((row) => row.id !== idSelected.current));
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

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
          // setOpenEdit(true);
          return [];
        }

        return [
          // <GridActionsCellItem
          //   icon={<EditIcon />}
          //   label="Edit"
          //   className="textPrimary"
          //   onClick={() => handleOpenMap(id)}
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
    { field: "id", headerName: "Id", minWidth: 150, editable: true },
    {
      field: "titulo",
      headerName: "Abstracto",
      minWidth: 150,
      editable: true,
    },
    {
      field: "editorial",
      headerName: "Descripción",
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
      headerName: "Oficina de Patente",
      minWidth: 180,
      editable: true,
    },
    {
      field: "lugardeOrganizacion",
      headerName: "URL",
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
          description={`Desea borrar el autor ${
            rows[Number(idSelected.current) || 0].autor
          }`}
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
