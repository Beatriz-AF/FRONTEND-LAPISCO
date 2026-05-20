import { useWeather } from "./hooks/useWeather";
import { SearchBar } from "./components/SearchBar";
import { CurrentWeatherCard } from "./components/CurrentWeatherCard";
import { ForecastCard } from "./components/ForecastCard";
import { WeatherChart } from "./components/WeatherChart";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  const {
    cityName, current, forecast,
    chartLabels, chartMax, chartMin,
    loading, error, buscarClima,
  } = useWeather("Fortaleza");

  return (
    <div className="container">
      <div className="topo-site">
        <h1 className="titulo">Consulta Meteorológica</h1>
        <ThemeToggle />
      </div>

      <SearchBar onSearch={buscarClima} />

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      {current && (
        <CurrentWeatherCard
          cityName={cityName}
          temperatura={current.temperatura}
          sensacao={current.sensacao}
          umidade={current.umidade}
          vento={current.vento}
          descricao={current.descricao}
          emoji={current.emoji}
          loading={loading}
        />
      )}

      <div className="layout-inferior">
        <ForecastCard forecast={forecast} />
        <WeatherChart labels={chartLabels} maximas={chartMax} minimas={chartMin} />
      </div>
    </div>
  );
}