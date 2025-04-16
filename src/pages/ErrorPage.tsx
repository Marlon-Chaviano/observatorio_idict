import { ErrorOutlineRounded } from "@mui/icons-material";
// import Hero from "../assets/photo_5132193281579527621_m.jpg";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
	const naviagte = useNavigate();
	return (
		<div className="w-full h-[70vh] flex flex-col justify-center items-center">
			{/* <img src={Hero} alt="Cipimm foto" /> */}
			<div className="mt-10">
				<p className="font-bold text-2xl italic text-red-500 flex justify-center items-center space-x-2">
					<span>
						<ErrorOutlineRounded />
					</span>
					<span>Oops ha ocurrido un error</span>
				</p>
				<p className="font-medium text-gray-600">
					Por favor revise que el servidor este activo y corrienddo
				</p>
				<button
					onClick={() => {
						naviagte("/main");
					}}
					className="bg-[#3F499D] px-4 py-2 rounded-md mt-4 text-white
        hover:bg-[#3F499D]/90 transition"
				>
					Intentar de nuevo
				</button>
			</div>
		</div>
	);
};

export default ErrorPage;
