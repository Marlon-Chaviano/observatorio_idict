import { usePDF } from "react-to-pdf";
import CustomAppBar from "../components/CustomAppBar";
import { Container, Typography } from "@mui/material";
import { useState } from "react";
import FullFeaturedCrudGrid from "../components/CustomTable";
import { CustomPie } from "../components/charts/CustomPie";
import { GRAFICOS } from "../enums/GRAFICOS";
import FullFeaturedCrudGridPatents from "../components/charts/CustomTablePatents";
import { LineChartRegister } from "../components/charts/LineChartRegisters";
// import WordCloudComponent from "../components/charts/WordCloudComponent";

const JustGraficas = () => {
	const [showGrafica, setshowGrafica] = useState<GRAFICOS>(GRAFICOS.REGISTROS);

	const { toPDF, targetRef } = usePDF({ filename: "graficos.pdf" });

	return (
		<>
			<CustomAppBar
				toPDF={toPDF}
				tipoGrafica={showGrafica}
				onTap={setshowGrafica}
				isAdmin={false}
				handleClose={() => {}}
			>
				{showGrafica == GRAFICOS.REGISTROS && (
					<Container>
						<Typography
							variant="h6"
							style={{
								margin: "0px",
								padding: "0px",
							}}
						>
							Registros
						</Typography>
						<FullFeaturedCrudGrid />
					</Container>
				)}
				,
				{showGrafica == GRAFICOS.PATENTES && (
					<Container>
						<Typography
							variant="h6"
							style={{
								margin: "0px",
								padding: "0px",
							}}
						>
							Patentes
						</Typography>
						<FullFeaturedCrudGridPatents />
					</Container>
				)}
				{showGrafica == GRAFICOS.PIE && (
					<Container
						ref={targetRef}
						style={{
							padding: "250px",
							paddingTop: "0px",
						}}
					>
						<Typography
							variant="h4"
							style={{
								margin: "0px",
								padding: "0px",
								fontSize: "20px",
							}}
						>
							Diagrama de Pastel - Porcentaje de Patentes
						</Typography>
						<CustomPie />
					</Container>
				)}
				{showGrafica == GRAFICOS.LINEAR_REGISTROS && (
					<Container ref={targetRef}>
						<LineChartRegister />
					</Container>
				)}
				{/* {showGrafica == GRAFICOS.WORD_CLOUD && (
					<Container ref={targetRef}>
						<WordCloudComponent />
					</Container>
				)} */}
			</CustomAppBar>
		</>
	);
};

export default JustGraficas;
