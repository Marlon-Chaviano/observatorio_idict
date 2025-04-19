import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { observatory } from "../context";
import AppRouter from "../router/routes";
import axios from "axios";

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
				const { data: registros } = await axios.get("src/data/registros.json");

				const { data: patentes } = await axios.get("src/data/patentes.json");

				const { data: ejes } = await axios.get("src/data/ejes.json");

				const { data: fuentes } = await axios.get("src/data/fuentes.json");

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
