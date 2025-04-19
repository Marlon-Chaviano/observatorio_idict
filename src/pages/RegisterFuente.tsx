/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
	Avatar,
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	Stack,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { axiosInstance } from "../config/axios";
import { useState } from "react";
import {
	CustomizedSnackbars,
	TYPE_MESSAGES,
} from "../components/MessageAlerts";
import { TIPOS_FUENTES } from "../constants/tiposFuentes";
import { observatory } from "../context";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

export const RegisterFuente = () => {
	const { ejes: draft } = React.useContext(observatory);
	const EJES_TEMATICOS = draft.map((eje) => eje.nombre_eje);
	const [form, setform] = useState({
		titulo: "",
		organizacion: "",
		frecuencia: 1,
		editores: "",
		tipoFuente: TIPOS_FUENTES[0],
		ejesTematicos: EJES_TEMATICOS[0],
		url: "",
		isOpen: false,
	});
	const navigate = useNavigate();

	const [statusCreate, setstatusCreate] = useState({
		status: TYPE_MESSAGES.NOT_STATUS,
		message: "",
	});

	// // const navigate = useNavigate();
	// const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
	// 	if (reason === 'clickaway') return;

	// 	setloginStatus({...loginStatus, status: TYPE_MESSAGES.NOT_STATUS})
	// };

	const getMessages = (message: string) => {
		if (message.startsWith("title")) return "Título es requerido";
		if (message.startsWith("materia")) return "La materia es requerida";
		if (message.startsWith("organization"))
			return "La organización es requerida";
		if (message.startsWith("organismo")) return "Organismo es requerido";
		if (message.startsWith("url")) return "El url es requerido";
		if (
			message.startsWith("Key") ||
			message.startsWith("Ya existe la llave (title)")
		)
			return message.replace("Key (title)=", "");
		if (message.startsWith("editores")) return "Editor es requerido";
		if (message.startsWith("El nombre del editor no puede conteneter"))
			return message;
		return "Error en el formulario contacte al administrador";
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("titulo", form.titulo);
		formData.append("organizacion", form.organizacion);
		formData.append("frecuencia", String(form.frecuencia));
		formData.append("editores", form.editores);
		formData.append("materia", form.tipoFuente);
		formData.append("url", form.url);
		formData.append("eje_tematico", form.ejesTematicos);
		formData.append("isOpen", String(form.isOpen));
		try {
			axiosInstance.post("fuentes/create", formData, {
				headers: {
					"Content-Type": "multipart/form-data", // Esto es importante para enviar FormData
				},
			});
			setstatusCreate({
				status: TYPE_MESSAGES.SUCCESS,
				message: "Fuente agregada correctamente",
			});
			setTimeout(() => {
				localStorage.setItem("back", "registrar_fuente");
				navigate("/");
			}, 2000);
		} catch (error: any) {
			if (error && error.response && error.response.data) {
				const data = error.response.data;
				const message = Array.isArray(data.message)
					? data.message[0]
					: data.message;
				setstatusCreate({
					status: TYPE_MESSAGES.ERROR,
					message: getMessages(message as string),
				});
			} else {
				setstatusCreate({
					status: TYPE_MESSAGES.ERROR,
					message: "Error desconocido hable con el administrador",
				});
			}
		}
	};

	function handleClose(
		_event?: Event | React.SyntheticEvent<Element, Event> | undefined,
		reason?: string | undefined
	): void {
		if (reason === "clickaway") return;

		setstatusCreate({ ...statusCreate, status: TYPE_MESSAGES.NOT_STATUS });
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container
				component="main"
				maxWidth="xs"
			>
				<CssBaseline />
				<Box
					sx={{
						// marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1 }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography
						component="h1"
						variant="h5"
					>
						Registro de Fuentes
					</Typography>
					<form
						method="POST"
						onSubmit={handleSubmit}
						className="mt-2"
					>
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									autoComplete="given-name"
									name="titulo"
									required
									fullWidth
									id="titulo"
									label="Título"
									onChange={(e) =>
										setform({
											...form,
											titulo: e.target.value,
										})
									}
									value={form.titulo}
									autoFocus
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									required
									fullWidth
									onChange={(e) =>
										setform({
											...form,
											frecuencia: Number(e.target.value),
										})
									}
									value={form.frecuencia}
									id="frecuencia"
									label="Frecuencia"
									type="number"
									inputProps={{ min: 1 }}
									name="frecuencia"
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									required
									fullWidth
									onChange={(e) =>
										setform({
											...form,
											editores: e.target.value,
										})
									}
									value={form.editores}
									name="editores"
									label="Editor"
									id="editores"
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									required
									fullWidth
									onChange={(e) =>
										setform({
											...form,
											organizacion: e.target.value,
										})
									}
									value={form.organizacion}
									name="organizacion"
									label="Organización"
									id="organizacion"
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">
										Tipo de Fuente
									</InputLabel>
									<Select
										labelId="materia"
										id="materia"
										label="Tipo de Fuente"
										onChange={(e) =>
											setform({
												...form,
												tipoFuente: e.target.value,
											})
										}
										value={form.tipoFuente}
									>
										{TIPOS_FUENTES.map((tipo) => (
											<MenuItem
												key={tipo}
												value={tipo}
											>
												{tipo}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<FormControl fullWidth>
									<InputLabel id="ejesTematicos">Ejes Temáticos</InputLabel>
									<Select
										labelId="ejesTematicos"
										id="ejesTematicos"
										label="Ejes Temáticos"
										onChange={(e) =>
											setform({ ...form, ejesTematicos: e.target.value })
										}
										value={form.ejesTematicos}
									>
										{EJES_TEMATICOS.map((eje) => (
											<MenuItem
												key={eje}
												value={eje}
											>
												{eje}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>

							<Grid
								item
								xs={12}
							>
								<TextField
									fullWidth
									required
									onChange={(e) =>
										setform({
											...form,
											url: e.target.value,
										})
									}
									value={form.url}
									name="url"
									label="Url"
									id="url"
								/>
							</Grid>
						</Grid>
						<FormControlLabel
							onChange={(va: any) => {
								setform({
									...form,
									isOpen: va.target.checked,
								});
							}}
							control={<Checkbox value={form.isOpen} />}
							label="Está abierta la fuente?"
						/>
						<Stack
							spacing={{ xs: 1, sm: 2 }}
							direction="row"
							sx={{ marginTop: "30px" }}
						>
							<button
								type="submit"
								hidden
							></button>
							<button
								className="bg-green-600 w-full p-4 rounded-xl text-white font-bold hover:bg-green-600/80 transition "
								type="submit"
							>
								Registrar Fuente
							</button>
						</Stack>
						<CustomizedSnackbars
							open={statusCreate.status !== TYPE_MESSAGES.NOT_STATUS}
							message={statusCreate.message}
							type={statusCreate.status}
							closeFunction={handleClose}
						/>
					</form>
				</Box>
			</Container>
		</ThemeProvider>
	);
};
