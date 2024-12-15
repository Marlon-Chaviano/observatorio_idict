import { registrosProps } from "../components/CustomTable";

export const formatData = (response: registrosProps) => {
	const data = JSON.parse(JSON.parse(response.metadata));

	const formattedData = {
		id: response.id,
		title: data._map?.title[0],
		creators: data._map?.creator.join(", "),
		subject: data._map?.subject.join(", "),
		description: data._map?.description[0],
		publisher: data._map?.publisher[0],
		date: data._map?.date[0],
		type: data._map?.type.join(", "),
		format: data._map?.format[0],
		identifier: data._map?.identifier[0],
		language: data._map?.language[0],
		rights: data._map?.rights[0],
		source: data._map?.source[0],
		relation: data._map?.relation[0],
	};
	return formattedData;
};
