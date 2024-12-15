import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Typography } from "@mui/material";
import { axiosInstance } from "../config/axios";
import { FuenteDB } from "../interfaces/fuente.interface";

export const NestedList = () => {
	const [openEjes, setOpenEjes] = React.useState(false);
	const [openTipo, setOpenTipos] = React.useState(false);

	const handleClickEjes = () => {
		setOpenEjes(!openEjes);
	};
	const handleClickTipos = () => {
		setOpenTipos(!openTipo);
	};

	const [ejes, setejes] = React.useState({
		tele: 0,
		electroEnergia: 0,
		mA: 0,
		iL: 0,
		ali: 0,
		agroInds: 0,
		turismo: 0,
		transporte: 0,
		redesHi: 0,
		construcciones: 0,
		salud: 0,
		biotecnologia: 0,
		servPro: 0,
		"Revista científica": 0,
		"Repositorio institucional": 0,
		"Base de datos patentes": 0,
		"Repositorio de Tesis": 0,
		"Base de datos de revistas científicas": 0,
		Agregador: 0,
		"Repositorio Temático": 0,
		"Serivodor de preprints temático": 0,
		"Base de datos multidisciplinaria": 0,
		"Repositorio común": 0,
	});

	React.useEffect(() => {
		try {
			axiosInstance
				.get<FuenteDB[]>("/v1/fuentes/get-all-fuentes")
				.then((resp) => {
					const data = resp.data;
					setejes({
						tele: data.filter(
							(eje) => eje.ejesTematicos === "Telecomunicaciones"
						).length,
						electroEnergia: data.filter(
							(eje) => eje.ejesTematicos === "Electroenergía"
						).length,
						mA: data.filter(
							(eje) => eje.ejesTematicos === "Medio Ambiente"
						).length,
						iL: data.filter(
							(eje) => eje.ejesTematicos === "Industria Ligera"
						).length,
						ali: data.filter(
							(eje) => eje.ejesTematicos === "Alimentación"
						).length,
						agroInds: data.filter(
							(eje) => eje.ejesTematicos === "Agroindustria"
						).length,
						turismo: data.filter(
							(eje) => eje.ejesTematicos === "Turismo"
						).length,
						transporte: data.filter(
							(eje) => eje.ejesTematicos === "Transporte"
						).length,
						redesHi: data.filter(
							(eje) => eje.ejesTematicos === "Redes hidráulicas"
						).length,
						construcciones: data.filter(
							(eje) => eje.ejesTematicos === "Construcciones"
						).length,
						salud: data.filter(
							(eje) => eje.ejesTematicos === "Salud"
						).length,
						biotecnologia: data.filter(
							(eje) => eje.ejesTematicos === "Biotecnología"
						).length,
						servPro: data.filter(
							(eje) =>
								eje.ejesTematicos === "Servicios profesionales"
						).length,
						"Revista científica": data.filter(
							(f) => f.materia == "Revista científica"
						).length,
						"Repositorio institucional": data.filter(
							(f) => f.materia == "Repositorio institucional"
						).length,
						"Base de datos patentes": data.filter(
							(f) => f.materia == "Base de datos patentes"
						).length,
						"Repositorio de Tesis": data.filter(
							(f) => f.materia == "Repositorio de Tesis"
						).length,
						"Base de datos de revistas científicas": data.filter(
							(f) =>
								f.materia ==
								"Base de datos de revistas científicas"
						).length,
						Agregador: data.filter((f) => f.materia == "Agregador")
							.length,
						"Repositorio Temático": data.filter(
							(f) => f.materia == "Repositorio Temático"
						).length,
						"Serivodor de preprints temático": data.filter(
							(f) =>
								f.materia == "Serivodor de preprints temático"
						).length,
						"Base de datos multidisciplinaria": data.filter(
							(f) =>
								f.materia == "Base de datos multidisciplinaria"
						).length,
						"Repositorio común": data.filter(
							(f) => f.materia == "Repositorio común"
						).length,
					});
				});
		} catch (error) {
			console.log({ error });
		}
	}, []);

	return (
		<List
			sx={{ width: "100%", minWidth: 550, bgcolor: "background.paper" }}
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Listas de elementos
				</ListSubheader>
			}
		>
			<ListItemButton onClick={handleClickEjes}>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary="Ejes Tematicos" />
				{openEjes ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={openEjes} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Telecomunicaciones" />
						<Typography>{ejes.tele}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Electroenergía" />
						<Typography>{ejes.electroEnergia}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Medio Ambiente" />
						<Typography>{ejes.mA}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Industria Ligera" />
						<Typography>{ejes.iL}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Alimentación" />
						<Typography>{ejes.ali}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Agroindustria" />
						<Typography>{ejes.agroInds}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Turismo" />
						<Typography>{ejes.turismo}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Transporte" />
						<Typography>{ejes.transporte}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Redes hidráulicas" />
						<Typography>{ejes.redesHi}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Construcciones" />
						<Typography>{ejes.construcciones}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Salud" />
						<Typography>{ejes.salud}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Biotecnología" />
						<Typography>{ejes.biotecnologia}</Typography>
					</ListItemButton>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Servicios profesionales" />
						<Typography>{ejes.servPro}</Typography>
					</ListItemButton>
				</List>
			</Collapse>
			<ListItemButton onClick={handleClickTipos}>
				<ListItemIcon>
					<InboxIcon />
				</ListItemIcon>
				<ListItemText primary="Tipos de Fuente" />
				{openTipo ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={openTipo} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Revista científica" />
						<Typography>{ejes["Revista científica"]}</Typography>
					</ListItemButton>
				</List>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Repositorio institucional" />
						<Typography>
							{ejes["Repositorio institucional"]}
						</Typography>
					</ListItemButton>
				</List>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Base de datos patentes" />
						<Typography>
							{ejes["Base de datos patentes"]}
						</Typography>
					</ListItemButton>
				</List>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Repositorio de Tesis" />
						<Typography>{ejes["Repositorio de Tesis"]}</Typography>
					</ListItemButton>
				</List>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Base de datos de revistas científicas" />
						<Typography>
							{ejes["Base de datos de revistas científicas"]}
						</Typography>
					</ListItemButton>
				</List>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Agregador" />
						<Typography>{ejes["Agregador"]}</Typography>
					</ListItemButton>
				</List>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Repositorio Temático" />
						<Typography>{ejes["Repositorio Temático"]}</Typography>
					</ListItemButton>
				</List>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Serivodor de preprints temático" />
						<Typography>
							{ejes["Serivodor de preprints temático"]}
						</Typography>
					</ListItemButton>
				</List>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Base de datos multidisciplinaria" />
						<Typography>
							{ejes["Base de datos multidisciplinaria"]}
						</Typography>
					</ListItemButton>
				</List>
				<List component="div" disablePadding>
					<ListItemButton sx={{ pl: 4 }}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Repositorio común" />
						<Typography>{ejes["Repositorio común"]}</Typography>
					</ListItemButton>
				</List>
			</Collapse>
		</List>
	);
};
