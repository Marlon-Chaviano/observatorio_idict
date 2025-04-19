import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BackupTableSharpIcon from "@mui/icons-material/BackupTableSharp";
import DonutSmallSharpIcon from "@mui/icons-material/DonutSmallSharp";
import LineAxisSharp from "@mui/icons-material/LineAxisSharp";
import { Options } from "react-to-pdf";
// import Logo from "../assets/photo_5132193281579527621_m.jpg";
import { GRAFICOS } from "../enums/GRAFICOS";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { ImportContactsSharp } from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

interface Props {
	children: React.ReactNode;
	onTap: React.Dispatch<React.SetStateAction<GRAFICOS>>;
	tipoGrafica?: GRAFICOS;
	toPDF: (options?: Options | undefined) => void;
	handleClose: () => void;
	isAdmin?: boolean;
}

const GRAFICOS_LAYOUTS = [
	{
		layoutName: "REGISTROS",
		grafica: GRAFICOS.REGISTROS,
		icono: <BackupTableSharpIcon />,
	},
	{
		layoutName: "PATENTES",
		grafica: GRAFICOS.PATENTES,
		icono: <ImportContactsSharp />,
	},
	{
		layoutName: "PIE",
		grafica: GRAFICOS.PIE,
		icono: <DonutSmallSharpIcon />,
	},
	{
		layoutName: "LINEAR_REGISTER",
		grafica: GRAFICOS.LINEAR_REGISTROS,
		icono: <LineAxisSharp />,
	},
	// {
	// 	layoutName: "WORD_CLOUD",
	// 	grafica: GRAFICOS.WORD_CLOUD,
	// 	icono: <Cloud />,
	// },

	// {
	// 	layoutName: "Mapas Marcador",
	// 	grafica: GRAFICOS.MAPAS_ONLY,
	// 	icono: <AutoGraphIcon />,
	// },
	// {
	// 	layoutName: "Mapas Marcadores",
	// 	grafica: GRAFICOS.MAPAS_MANY,
	// 	icono: <BackupIcon />,
	// },
];

export default function CustomAppBar({
	children,
	onTap,
	tipoGrafica = GRAFICOS.REGISTROS,
	toPDF,
	handleClose,
	isAdmin = true,
}: Props) {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const navigate = useNavigate();

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				sx={{
					background: "#fff",
					color: "green",
					padding: 1,
				}}
				position="fixed"
				open={open}
			>
				<Toolbar style={{ display: "flex", alignItems: "center" }}>
					<IconButton
						color="primary"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>

					{/* <div className="logo">
						<img
							src={Logo}
							alt="Logo del CIPIMM"
							width={205}
							height={80}
						/>
					</div> */}
					<Typography
						variant="h4"
						component="div"
						sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
						style={{ fontWeight: "bolder" }}
					>
						{/* Aqui va el nombre de la empresa */}
						{/* OCTI */}
						<img
							className="h-16 w-fit"
							src="/images/octi.jpeg"
						/>
					</Typography>
					{tipoGrafica != GRAFICOS.REGISTROS && (
						<Button
							color="inherit"
							onClick={() => toPDF()}
						>
							Exportar Gráfica
						</Button>
					)}
					{isAdmin && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleClose}
							edge="start"
							sx={{
								marginRight: 5,
								...(open && { display: "none" }),
							}}
						>
							<CloseIcon />
						</IconButton>
					)}
					<Button
						style={{ marginLeft: "5px" }}
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
			<Drawer
				variant="permanent"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List style={{ marginTop: "25px" }}>
					{GRAFICOS_LAYOUTS.map((text) => (
						<ListItem
							key={text.layoutName}
							disablePadding
							sx={{ display: "block" }}
							onClick={() => onTap(text.grafica)}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}
								>
									{text.icono}
								</ListItemIcon>
								<ListItemText
									primary={text.layoutName}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Stack
					spacing={{ xs: 1, sm: 2 }}
					direction="row"
					useFlexGap
					flexWrap="wrap"
					justifyContent="center"
				>
					<Button
						onClick={() => {
							localStorage.removeItem("user");
							navigate("/", { replace: true });
						}}
						sx={{
							width: "90%",
							justifySelf: "center",
						}}
						variant="outlined"
					>
						Salir
					</Button>
				</Stack>
			</Drawer>
			<Box
				component="main"
				sx={{ flexGrow: 1, p: 3 }}
			>
				<DrawerHeader />
				{children}
			</Box>
		</Box>
	);
}
