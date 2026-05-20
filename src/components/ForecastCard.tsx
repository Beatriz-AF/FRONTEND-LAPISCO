import { DayForecast } from "../types/weather";

interface ForecastCardProps {
  forecast: DayForecast[];
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="previsao-futura">
      <h2>Próximos Dias</h2>
      <div className="dias-container">
        {forecast.map((day, i) => (
          <div className="dia-card" key={i}>
            <h3>{day.dia}</h3>
            <p>{day.emoji}</p>
            <span>{day.max}°C / {day.min}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}