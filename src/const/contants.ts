const labels = ["January", "February", "March", "April", "May", "June", "July"];

const JSON_AUX = {
	allLinesLinear: {
		labels: labels,
		datasets: [
			{
				label: "Autor",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(9, 122, 118)",
				backgroundColor: "rgba(9, 122, 118, 0.5)",
				yAxisID: "y",
			},
			{
				label: "Título",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(26, 254, 247)",
				backgroundColor: "rgba(26, 254, 247, 0.5)",
				yAxisID: "y1",
			},
			{
				label: "Fecha",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(67, 209, 14)",
				backgroundColor: "rgba(67, 209, 14, 0.5)",
				yAxisID: "y",
			},
			{
				label: "Editorial",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(28, 93, 4)",
				backgroundColor: "rgba(28, 93, 4, 0.5)",
				yAxisID: "y1",
			},
			{
				label: "Materia",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(191, 8, 91)",
				backgroundColor: "rgba(191, 8, 91, 0.5)",
				yAxisID: "y",
			},
			{
				label: "Organización",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(105, 2, 2)",
				backgroundColor: "rgba(105, 2, 2, 0.5)",
				yAxisID: "y1",
			},
			{
				label: "Descripción",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(55, 64, 90)",
				backgroundColor: "rgba(55, 64, 90, 0.5)",
				yAxisID: "y1",
			},
		],
	},
	oneLinesAutor: {
		labels: labels,
		datasets: [
			{
				label: "Autor",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(9, 122, 118)",
				backgroundColor: "rgba(9, 122, 118, 0.5)",
				yAxisID: "y",
			},
		],
	},
	oneLinesTittle: {
		labels: labels,
		datasets: [
			{
				label: "Titulo",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(9, 122, 118)",
				backgroundColor: "rgba(9, 122, 118, 0.5)",
				yAxisID: "y",
			},
		],
	},
	oneLinesFecha: {
		labels: labels,
		datasets: [
			{
				label: "Fecha",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(9, 122, 118)",
				backgroundColor: "rgba(9, 122, 118, 0.5)",
				yAxisID: "y",
			},
		],
	},
	oneLinesEditorial: {
		labels: labels,
		datasets: [
			{
				label: "Editorial",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(9, 122, 118)",
				backgroundColor: "rgba(9, 122, 118, 0.5)",
				yAxisID: "y",
			},
		],
	},
	oneLinesMateria: {
		labels: labels,
		datasets: [
			{
				label: "Materia",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(9, 122, 118)",
				backgroundColor: "rgba(9, 122, 118, 0.5)",
				yAxisID: "y",
			},
		],
	},
	oneLinesOrganizacion: {
		labels: labels,
		datasets: [
			{
				label: "Organización",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(9, 122, 118)",
				backgroundColor: "rgba(9, 122, 118, 0.5)",
				yAxisID: "y",
			},
		],
	},
	oneLinesPlaceOrganizacion: {
		labels: labels,
		datasets: [
			{
				label: "Descripción",
				data: labels.map(() => Math.random() * 1000),
				borderColor: "rgb(9, 122, 118)",
				backgroundColor: "rgba(9, 122, 118, 0.5)",
				yAxisID: "y",
			},
		],
	},
	nodesAndLinks: {
		nodes: [
			{ x: 10, y: 20 },
			{ x: 30, y: 40 },
			// ... más nodos
		],
		links: [
			[
				{ x: 10, y: 20 },
				{ x: 30, y: 40 },
			],
			// ... más enlaces
		],
	},
};

export default JSON_AUX;
