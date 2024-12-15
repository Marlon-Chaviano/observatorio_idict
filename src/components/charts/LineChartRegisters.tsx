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
import { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import { observatory } from "../../context";
import { isNumber } from "chart.js/helpers";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { formatData } from "../../const/functions";

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
      text: "Publicaciones por Año",
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

export function LineChartRegister() {
  const { registros, fuentes } = useContext(observatory);
  const [draft, setDraft] = useState(
    registros.filter((reg) => reg.fuente == fuentes[1].id)
  );

  const [fuenteSlect, setFuenteSlect] = useState(fuentes[1].id);
  const formated = draft.map((item) => formatData(item));
  const map = new Map();
  for (const register of formated) {
    const fecha = new Date(register.date).getFullYear();
    if (map.has(fecha)) {
      map.set(fecha, map.get(fecha) + 1);
    } else if (isNumber(fecha)) {
      map.set(fecha, 1);
    }
  }
  const registerData = Array.from(map).sort((a, b) => a[0] - b[0]);
  const labels = Array.from(registerData.map((item) => item[0]));
  const reg = registerData.map((item) => item[1]);

  if (reg.length == 0) {
    return (
      <main>
        <FormControl sx={{ width: "30%" }}>
          <InputLabel id="fuente">Fuentes</InputLabel>
          <Select
            fullWidth
            id="fuente"
            labelId="fuente"
            label="Fuente"
            className="space-x-2"
            value={fuenteSlect}
            onChange={(e) => {
              setFuenteSlect(Number(e.target.value));
              setDraft(registros.filter((reg) => reg.fuente == e.target.value));
            }}
          >
            {fuentes.map((fuente) => (
              <MenuItem key={fuente.id} value={fuente.id}>
                {fuente.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <p className="mt-4 italic text-red-600 font-bold">
          No existen registros de la fuente seleccionada
        </p>
      </main>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Registros por Año",
        data: reg,
        borderColor: "#1876D1",
        backgroundColor: "#1876D1",
        yAxisID: "y",
      },
    ],
  };

  return (
    <main>
      <FormControl sx={{ width: "30%" }}>
        <InputLabel id="fuente">Fuentes</InputLabel>
        <Select
          fullWidth
          id="fuente"
          labelId="fuente"
          label="Fuente"
          className="space-x-2"
          value={fuenteSlect}
          onChange={(e) => {
            setFuenteSlect(Number(e.target.value));
            setDraft(registros.filter((reg) => reg.fuente == e.target.value));
          }}
        >
          {fuentes.map((fuente) => (
            <MenuItem key={fuente.id} value={fuente.id}>
              {fuente.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Line options={options} data={data} />
    </main>
  );
}
