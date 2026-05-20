import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface WeatherChartProps {
  labels: string[];
  maximas: number[];
  minimas: number[];
}

export function WeatherChart({ labels, maximas, minimas }: WeatherChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef  = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !labels.length) return;

    chartRef.current?.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Temperatura Máxima",
            data: maximas,
            borderColor: "#ffcc00",
            backgroundColor: "#ffcc00",
            tension: 0.4,
          },
          {
            label: "Temperatura Mínima",
            data: minimas,
            borderColor: "#00d4ff",
            backgroundColor: "#00d4ff",
            tension: 0.4,
          },
        ],
      },
    });

    return () => { chartRef.current?.destroy(); };
  }, [labels, maximas, minimas]);

  return (
    <div className="grafico-container">
      <h2 className="titulo-grafico">Previsão dos Próximos 7 Dias</h2>
      <canvas ref={canvasRef} />
    </div>
  );
}