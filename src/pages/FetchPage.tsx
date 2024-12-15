import { observatory } from "../context";
import AppRouter from "../router/routes";
import FUENTES from "../data/fuentes.json";
import REGISTROS from "../data/registros.json";
import PATENTES from "../data/patentes.json";
import EJES from "../data/ejes.json";

const FetchPage = () => {
	return (
		<observatory.Provider
			value={{
				registros: REGISTROS,
				patentes: PATENTES,
				fuentes: FUENTES,
				ejes: EJES,
			}}
		>
			<AppRouter />
		</observatory.Provider>
	);
};

export default FetchPage;
