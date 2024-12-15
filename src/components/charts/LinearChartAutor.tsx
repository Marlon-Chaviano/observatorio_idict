import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	interaction: {
		mode: "index" as const,
		intersect: false,
	},
	stacked: false,
	plugins: {
		title: {
			display: true,
			text: "Grafico de Linea",
		},
	},
	scales: {
		y: {
			type: "linear" as const,
			display: true,
			position: "left" as const,
		},
		y1: {
			type: "linear" as const,
			display: true,
			position: "right" as const,
			grid: {
				drawOnChartArea: false,
			},
		},
	},
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
	labels,
	datasets: [
		{
			label: "Autor",
			data: labels.map(() => Math.random() * 1000),
			borderColor: "rgb(9, 122, 118)",
			backgroundColor: "rgba(9, 122, 118, 0.5)",
			yAxisID: "y",
		},
	],
};

export function LinearChartAutor() {
	return <Line options={options} data={data} />;
}
