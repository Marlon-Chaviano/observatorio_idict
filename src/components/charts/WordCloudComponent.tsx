// import { useContext } from "react";
// import { observatory } from "../../context.ts";
// import { formatData } from "../../const/functions.ts";
import WordCloud from "react-d3-cloud";
const WordCloudComponent = () => {
	// const formatedData = registros.map((item) => formatData(item));
	// const f = formatedData.map((reg) => reg.subject);
	// const l = f.map((phrase) => {
	// 	if (phrase) {
	// 		return phrase.split(";").join(" ");
	// 	}
	// });
	// l.map((w) => {
	// 	if (w?.length > 0) {
	// 		w?.split(" ").map((word: string) => {
	// 			words.push(word);
	// 		});
	// 	}
	// });

	// for (const word of words) {
	// 	if (word) {
	// 		if (dic.has(word)) {
	// 			dic.set(word, dic.get(word) + 1);
	// 		} else dic.set(word, 1);
	// 	}
	// }
	// const myWords = [];
	// for (const entry of dic.entries()) {
	// 	myWords.push({ text: entry[0], value: entry[1] });
	// }
	const myWords = [
		{
			text: "medicina",
			value: 20,
		},
		{
			text: "zinc",
			value: 70,
		},
		{
			text: "petróleo",
			value: 120,
		},
		{
			text: "oro",
			value: 70,
		},
		{
			text: "cobalto",
			value: 35,
		},
		{
			text: "silicio",
			value: 10,
		},
		{
			text: "litio",
			value: 80,
		},
	];

	return (
		<WordCloud
			data={myWords}
			fontSize={10}
		/>
	);
};
export default WordCloudComponent;
