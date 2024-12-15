import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Hero from "../assets/photo_5132193281579527622_x.jpg";
import { axiosInstance } from "../config/axios";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// eslint-disable-next-line react-refresh/only-export-components
export enum LOGIN_STATUS {
	INITIAL = "INITIAL",
	LOADING = "LOADING",
	SUCCESS = "SUCCESS",
	FAILURE = "FAILURE",
}

export default function SignIn() {
	const [loginStatus, setloginStatus] = React.useState<LOGIN_STATUS>(
		LOGIN_STATUS.INITIAL
	);

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		try {
			const response = axiosInstance.post("login", data);
			const user = await response;
			if (user.data.error) {
				setloginStatus(LOGIN_STATUS.FAILURE);
			} else {
				localStorage.setItem("user", JSON.stringify(user.data));
				setloginStatus(LOGIN_STATUS.SUCCESS);
				navigate("/main", {
					replace: true,
					state: { user: user.data },
				});
			}
		} catch (error) {
			setloginStatus(LOGIN_STATUS.FAILURE);
		}
	};

	React.useEffect(() => {
		localStorage.getItem("user") && navigate("/main", { replace: true });
	});

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container
				component="main"
				maxWidth="xs"
			>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography
						component="h1"
						variant="h5"
					>
						Iniciar Sesión
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>

						<button
							type="submit"
							className="px-4 py-2 w-full hover:bg-blue-700/60 transition bg-blue-700 mx-auto my-4 text-white rounded-md font-bold uppercase tracking-wider"
						>
							Iniciar Sesión
						</button>
						<Snackbar
							open={loginStatus === LOGIN_STATUS.SUCCESS}
							autoHideDuration={6000}
							onClose={() => setloginStatus(LOGIN_STATUS.INITIAL)}
						>
							<Alert
								onClose={() => setloginStatus(LOGIN_STATUS.INITIAL)}
								severity="success"
								sx={{ width: "100%" }}
							>
								Inicio de Sesión Exitoso
							</Alert>
						</Snackbar>
						<Snackbar
							open={loginStatus === LOGIN_STATUS.FAILURE}
							autoHideDuration={6000}
							onClose={() => setloginStatus(LOGIN_STATUS.INITIAL)}
						>
							<Alert
								onClose={() => setloginStatus(LOGIN_STATUS.INITIAL)}
								severity="error"
								sx={{ width: "100%" }}
							>
								Credenciales Incorrectos!
							</Alert>
						</Snackbar>
					</Box>

					<div>
						<h2 className="text-7xl font-bold text-blue-600">IDICT</h2>
					</div>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
