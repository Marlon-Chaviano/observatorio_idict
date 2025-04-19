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
import axios from "axios";
// import Hero from "../assets/photo_5132193281579527622_x.jpg";

export type User = {
	id: number;
	name: string;
	password: string;
	apellido: string;
	email: string;
	organismo: string;
	provincia: string;
	municipio: string;
	direccion: string;
	is_superuser: boolean;
	last_login: string;
};

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

	const [userData, setUserData] = React.useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(event);
		const { data: users } = await axios.get("/data/users.json");
		// const data = new FormData(event.currentTarget);

		try {
			// const response = axiosInstance.post("login", data);
			// const user = await response;
			const user = users.find(
				(user: User) =>
					user.email == userData.email && user.password == userData.password
			);
			if (!user) {
				setloginStatus(LOGIN_STATUS.FAILURE);
			} else {
				localStorage.setItem("user", JSON.stringify(user));
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
					<form
						// component="form"
						onSubmit={handleSubmit}
						noValidate
						// sx={{ mt: 1 }}
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
							value={userData.email}
							onChange={(e) =>
								setUserData({ ...userData, email: e.target.value })
							}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							value={userData.password}
							onChange={(e) =>
								setUserData({ ...userData, password: e.target.value })
							}
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>

						<button
							type="submit"
							className="px-4 py-2 w-full hover:bg-[#e1090b]/60 transition bg-[#e1090b] mx-auto my-4 text-white rounded-md font-bold uppercase tracking-wider"
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
					</form>

					{/* <img
						src={Hero}
						width={500}
						height={200}
						alt=""
					/> */}
				</Box>
			</Container>
		</ThemeProvider>
	);
}
