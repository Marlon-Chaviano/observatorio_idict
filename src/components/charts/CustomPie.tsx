import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { observatory } from "../../context";
import { Patentes } from "../CustomTable";
import { isNumber } from "chart.js/helpers";
import { Colors } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export function CustomPie() {
  const { patentes } = useContext(observatory);

  const paises = patentes.map((item: Patentes) => {
    return item.patent_office;
  });
  const map = new Map();

  for (const pais of paises) {
    if (map.has(pais)) {
      map.set(pais, map.get(pais) + 1);
    } else {
      map.set(pais, 1);
    }
  }

  const draft = Array.from(map)
    .flat()
    .filter((item) => isNumber(item));

  const porcentaje = draft.map((item) => {
    return ((item * 100) / paises.length).toFixed(2);
  });

  const data = {
    labels: Array.from(new Set(paises)),
    datasets: [
      {
        label: "Porcentaje del Total",
        data: porcentaje,

        backgroundColor: [
          "#FFC58A",
          "#7FFF9E",
          "#85A3FF",
          "#FFA3D1",
          "#FFECB3",
          "#7FFFD6",
          "#FF85A3",
          "#85D3FF",
          "#FFBE8A",
          "#7FFF7F",
          "#AF8AFF",
        ],
      },
    ],
  };
  return <Pie data={data} />;
}
