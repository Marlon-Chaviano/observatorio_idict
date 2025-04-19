import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { observatory } from "../context";
import AppRouter from "../router/routes";

const JsonPage = () => {
	const navigate = useNavigate();
	const [db, setDb] = useState({
		registros: [],
		patentes: [],
		fuentes: [],
		ejes: [],
	});
	useEffect(() => {
		const FETCH = async () => {
			try {
				const registros = await fetch("src/data/registros.json").then((res) =>
					res.json()
				);
				const patentes = await fetch("src/data/patentes.json").then((res) =>
					res.json()
				);
				const ejes = await fetch("src/data/ejes.json").then((res) =>
					res.json()
				);
				const fuentes = await fetch("src/data/fuentes.json").then((res) =>
					res.json()
				);

				setDb({ registros, patentes, fuentes, ejes });
			} catch (error) {
				console.log(error);
				navigate("/error");
			}
		};
		FETCH();
	}, [navigate]);

	return (
		<observatory.Provider value={db}>
			<AppRouter />
		</observatory.Provider>
	);
};

export default JsonPage;
