import { observatory } from "../context";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import {
  Monitor,
  PlayCircleOutline,
  StopCircleOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { axiosInstance } from "../config/axios";
import {
  CustomizedSnackbars,
  TYPE_MESSAGES,
} from "../components/MessageAlerts";
import { useNavigate } from "react-router-dom";

export const MonitorearPage = () => {
  const [openSnack, setOpenSnack] = useState({
    status: false,
    message: "",
    type: "",
  });
  const { fuentes: DATA, ejes } = React.useContext(observatory);
  const navigate = useNavigate();
  const draft = DATA.map((fuente) => ({
    ...fuente,
    ejeTematico: ejes.filter((eje) => eje.id_eje == fuente.id_eje)[0]
      .nombre_eje,
    start: false,
  }));

  function check_monitoring(id: number) {
    const fuente = DATA.find((fuente) => fuente.id == id);
    return fuente?.is_monitoring;
  }
  async function start_monitoring(id: number) {
    try {
      setOpenSnack({
        status: true,
        message: `Monitoreando fuente ${
          draft.find((fuente) => fuente.id == id)?.title
        }`,
        type: "SUCCESS",
      });
      await axiosInstance.get(`start-monitoring/${id}`);

      setTimeout(() => {
        localStorage.setItem("back", "monitorear_fuente");
        navigate("/");
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  }
  async function stop_monitoring(id: number) {
    try {
      await axiosInstance.get(`stop-monitoring/${id}`);
      setOpenSnack({
        status: true,
        message: `Se ha dejado de monitorear fuente ${
          draft.find((fuente) => fuente.id == id)?.title
        }`,
        type: "INFO",
      });
      setTimeout(() => {
        localStorage.setItem("back", "monitorear_fuente");
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }
  function check_start(id: number) {
    const fuente = draft.find((fuente) => fuente.id == id);
    return fuente?.start;
  }
  const columns: GridColDef[] = [
    {
      editable: true,
      field: "title",
      headerName: "Título",
      sortable: false,
      width: 250,
    },
    {
      editable: true,
      field: "ejeTematico",
      headerName: "Ejes Temáticos",
      type: "string",
      width: 250,
    },
    {
      editable: true,
      field: "materia",
      headerName: "Tipo de Fuente",
      sortable: false,
      width: 250,
    },
    {
      type: "actions",
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      width: 250,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<PlayCircleOutline />}
            label="Comenzar a Monitorear"
            className={`textPrimary ${
              check_start(id as number) && "text-red-500"
            }`}
            onClick={() => {
              start_monitoring(id as number);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<StopCircleOutlined />}
            label="Dejar de Monitorear"
            className="textPrimary"
            onClick={() => {
              stop_monitoring(id as number);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <Monitor
                className={`${
                  check_monitoring(Number(id)) && "text-green-500"
                }`}
              />
            }
            label="Monitoreo"
            onClick={() => {}}
            color="inherit"
          />,
        ];
      },
    },
  ];
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
      <DataGrid rows={draft} columns={columns} editMode="row" />
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
  );
};
