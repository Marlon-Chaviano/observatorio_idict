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
import LineAxisSharpIcon from "@mui/icons-material/LineAxisSharp";
import BackupTableSharpIcon from "@mui/icons-material/BackupTableSharp";
import DonutSmallSharpIcon from "@mui/icons-material/DonutSmallSharp";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import FormatColorFillOutlinedIcon from "@mui/icons-material/FormatColorFillOutlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { Options } from "react-to-pdf";

import { GRAFICOS } from "../enums/GRAFICOS";
import Button from "@mui/material/Button";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";

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
}

const GRAFICOS_LAYOUTS = [
  {
    layoutName: "Table",
    grafica: GRAFICOS.TABLE,
    icono: <BackupTableSharpIcon />,
  },
  {
    layoutName: "Linear",
    grafica: GRAFICOS.LINEAL,
    icono: <LineAxisSharpIcon />,
  },
  {
    layoutName: "Pie",
    grafica: GRAFICOS.PIE,
    icono: <DonutSmallSharpIcon />,
  },
  {
    layoutName: "AUTOR",
    grafica: GRAFICOS.LINEAL_AUTHOR,
    icono: <PersonPinOutlinedIcon />,
  },
  {
    layoutName: "TITULO",
    grafica: GRAFICOS.LINEAL_TITTLE,
    icono: <TitleOutlinedIcon />,
  },
  {
    layoutName: "FECHA",
    grafica: GRAFICOS.LINEAL_DATE,
    icono: <TodayOutlinedIcon />,
  },
  {
    layoutName: "EDITORIAL",
    grafica: GRAFICOS.LINEAL_EDITORIAL,
    icono: <FormatColorFillOutlinedIcon />,
  },
  {
    layoutName: "MATERIA",
    grafica: GRAFICOS.LINEAL_DATE,
    icono: <TopicOutlinedIcon />,
  },
  {
    layoutName: "ORGANIZACION",
    grafica: GRAFICOS.LINEAL_PLACE_ORGANIZATION,
    icono: <InventoryOutlinedIcon />,
  },
  {
    layoutName: "DESCRIPCION",
    grafica: GRAFICOS.LINEAL_PLACE_ORGANIZATION,
    icono: <PlaceOutlinedIcon />,
  },
  {
    layoutName: "Coautoría",
    grafica: GRAFICOS.NODES,
    icono: <ZoomInMapIcon />,
  },
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

function GraficasPage({
  children,
  onTap,
  tipoGrafica = GRAFICOS.TABLE,
  toPDF,
}: Props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Aqui va el nombre de la empresa */}
            Nombre de la empresa aun desconocido
          </Typography>
          {tipoGrafica != GRAFICOS.TABLE && (
            <Button color="inherit" onClick={() => toPDF()}>
              Exportar Gráfica
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
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
        <List>
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
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default GraficasPage;
