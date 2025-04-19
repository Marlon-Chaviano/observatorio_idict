/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CreateIcon from "@mui/icons-material/Create";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import { useEffect, useState } from "react";
import SignUp from "../pages/SingUp";
// import Logo from "../assets/photo_5132193281579527621_m.jpg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RegisterFuente } from "../pages/RegisterFuente";
import { TableUserEditable } from "./CustomTableUserEditable";
import { TableFuenteEditable } from "./CustomTableFuenteEditable";
import { DraggableDialog } from "./EstadisticaDialog";
// import GraficasDialog from "./GraficasDialog";
import JustGraficas from "../pages/JustGraficas";
import { MonitorearPage } from "../pages/MonitorearPage";

const drawerWidth = 240;

export enum MENU {
	REGISTER_USER,
	REGISTER_FUENTE,
	MONITOREAR_FUENTE,
	TABLE_USER,
	TABLE_FUENTE,
}

export const CustomDrawerPermanent = () => {
	const [showItem, setshowItem] = useState<MENU>(MENU.TABLE_USER);
	useEffect(() => {
		const redirectPage = localStorage.getItem("back");
		if (redirectPage == "monitorear_fuente")
			setshowItem(MENU.MONITOREAR_FUENTE);
		if (redirectPage == "registrar_fuente") setshowItem(MENU.TABLE_FUENTE);
		if (redirectPage == "tabla_fuente") setshowItem(MENU.TABLE_FUENTE);
		if (redirectPage == "tabla_user") setshowItem(MENU.TABLE_USER);
		if (redirectPage == "registrar_user") setshowItem(MENU.TABLE_USER);
	}, []);

	// const [openGraficas, setOpenGraficas] = useState<boolean>(false);
	const [openEstadistica, setopenEstadistica] = useState<boolean>(false);
	const [user, setuser] = useState<any>();
	const navigate = useNavigate();

	// const handleClose = () => {
	//   setOpenGraficas(false);
	// };

	useEffect(() => {
		const usernew = JSON.parse(localStorage.getItem("user") as string);
		setuser(usernew);
	}, []);

	if (user && user.is_superuser) {
		return (
			<>
				<Box sx={{ display: "flex" }}>
					<CssBaseline />
					<AppBar
						position="fixed"
						sx={{
							width: `calc(100% - ${drawerWidth}px)`,
							mr: `${drawerWidth}px`,
							background: "#fff",
							color: "green",
						}}
					>
						<Toolbar>
							{/* <div className="logo">
                <img src={Logo} alt="Logo CIPIMM" width={205} height={80} />
              </div> */}
							<Typography
								variant="h5"
								fontWeight={"bold"}
								component="div"
								sx={{ flexGrow: 1 }}
							>
								Panel Administrativo OCTI
							</Typography>
							{/* <Button
                style={{ marginRight: "25px" }}
                color="inherit"
                onClick={() => {
                  setopenEstadistica(true);
                }}
              >
                Recoger Estadísticas
              </Button> */}
							{/* <Button
                style={{ marginRight: "25px" }}
                color="inherit"
                onClick={() => {
                  // localStorage.removeItem("token");
                  // navigate("/", { replace: true });
                  handleClickOpen();
                }}
              >
                Gráficas
              </Button> */}
							<Button
								style={{ marginRight: "25px" }}
								color="inherit"
								onClick={() => {
									localStorage.removeItem("user");
									navigate("/", { replace: true });
								}}
							>
								Cerrar Sesión
							</Button>
						</Toolbar>
					</AppBar>
					<Box
						component="main"
						sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
					>
						<Toolbar />
						{user && user.is_superuser && showItem === MENU.TABLE_USER && (
							<TableUserEditable />
						)}
						{user && user.is_superuser && showItem === MENU.TABLE_FUENTE && (
							<TableFuenteEditable />
						)}
						{user &&
							user.is_superuser &&
							showItem === MENU.MONITOREAR_FUENTE && <MonitorearPage />}
						{user && user.is_superuser && showItem === MENU.REGISTER_USER && (
							<SignUp />
						)}
						{user && user.is_superuser && showItem === MENU.REGISTER_FUENTE && (
							<RegisterFuente />
						)}
					</Box>
					<Drawer
						sx={{
							width: drawerWidth,
							flexShrink: 0,
							"& .MuiDrawer-paper": {
								width: drawerWidth,
								boxSizing: "border-box",
							},
						}}
						variant="permanent"
						anchor="right"
					>
						<Toolbar />
						<Divider />
						<List>
							{[
								"Tabla de Usuarios",
								"Monitorear Fuente",
								"Tabla de Fuentes",
							].map((text, index) => (
								<ListItem
									key={text}
									disablePadding
								>
									<ListItemButton
										onClick={() => {
											if (text.endsWith("Usuarios")) {
												setshowItem(MENU.TABLE_USER);
											} else if (text.endsWith("Fuentes")) {
												setshowItem(MENU.TABLE_FUENTE);
											} else {
												setshowItem(MENU.MONITOREAR_FUENTE);
											}
										}}
									>
										<ListItemIcon>
											{index % 2 === 0 ? (
												<SupervisedUserCircleIcon />
											) : (
												<SmartButtonIcon />
											)}
										</ListItemIcon>
										<ListItemText primary={text} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
						<Divider />
						<List>
							{["Registro de Usuario", "Registro de Fuentes"].map(
								(text, index) => (
									<ListItem
										key={text}
										disablePadding
									>
										<ListItemButton
											onClick={() => {
												if (text.endsWith("Usuario")) {
													setshowItem(MENU.REGISTER_USER);
												} else {
													setshowItem(MENU.REGISTER_FUENTE);
												}
											}}
										>
											<ListItemIcon>
												{index % 2 === 0 ? (
													<CreateIcon />
												) : (
													<CreateNewFolderIcon />
												)}
											</ListItemIcon>
											<ListItemText primary={text} />
										</ListItemButton>
									</ListItem>
								)
							)}
						</List>
						<DraggableDialog
							open={openEstadistica}
							handleClose={() => setopenEstadistica(false)}
						/>
						{/* <GraficasDialog open={openGraficas} handleClose={handleClose} /> */}
					</Drawer>
				</Box>
			</>
		);
	}

	return <JustGraficas />;
};
