import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import { useNavigate } from "react-router-dom";
import { observatory } from "../context";
import AppRouter from "../router/routes";

const FetchPage = () => {
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
				const { data: registros } = await axiosInstance.get("registros");
				const { data: patentes } = await axiosInstance.get("patentes");
				const { data: ejes } = await axiosInstance.get("ejes");
				const { data: fuentes } = await axiosInstance.get("fuentes");
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

export default FetchPage;
