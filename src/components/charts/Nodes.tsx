/* eslint-disable @typescript-eslint/no-explicit-any */
// Graph.tsx
import React from "react";
import { Scatter } from "react-chartjs-2";

interface GraphProps {
	data: {
		nodes: { id: number; x: number; y: number; label: string }[];
		links: { source: number; target: number; label: string }[];
	};
}

export const Graph: React.FC<GraphProps> = ({ data }) => {
	const chartData = {
		datasets: [
			{
				label: "Nodos",
				data: data.nodes.map((node) => ({
					x: node.x,
					y: node.y,
					r: 10,
					label: node.label,
				})),
				showLine: false,
				pointRadius: 10,
				pointHoverRadius: 12,
				backgroundColor: "rgba(75,192,192,1)",
				datalabels: {
					display: "auto", // Muestra la etiqueta siempre
					// anchor: "end", // Ajusta el ancla de la etiqueta según tus necesidades
					// align: "start", // Ajusta la alineación de la etiqueta según tus necesidades
					// color: "black", // Ajusta el color de la etiqueta según tus necesidades
					font: { size: 12 }, // Ajusta el tamaño de la fuente según tus necesidades
				},
			},
			{
				label: "Enlaces",
				data: [],
				borderColor: "rgba(255, 0, 0, 0.8)",
				borderWidth: 2,
				type: "line",
			},
		],
	};

	data.links.forEach((link) => {
		chartData.datasets[1].data = chartData.datasets[1].data.concat(
			link as any
		);
	});

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: { min: 0, max: 100 },
			y: { min: 0, max: 100 },
		},
		plugins: {
			tooltip: {
				callbacks: {
					label: (context: any) => {
						const label =
							context.dataset.data[context.dataIndex].label;
						return context.dataset.label === "Nodos"
							? `Nodo: ${label}`
							: `Enlace: ${label}`;
					},
				},
			},
		},
		datalabels: {
			// Configuración global del plugin, puedes ajustar según tus necesidades
			color: "black",
			font: { size: 12 },
		},
	};

	return (
		<Scatter
			height={500}
			data={chartData as any}
			options={options}
			datasetIdKey="Carlos"
		/>
	);
};

export default Graph;
