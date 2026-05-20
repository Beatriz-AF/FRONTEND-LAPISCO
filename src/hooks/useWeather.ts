import { useState, useCallback, useEffect } from "react";
import { WeatherData, DayForecast } from "../types/weather";
import { interpretarClima, diaDaSemana } from "../utils/weather";

interface CurrentState {
  temperatura: number;
  sensacao: number;
  umidade: number;
  vento: number;
  descricao: string;
  emoji: string;
}

interface UseWeatherReturn {
  cityName: string;
  current: CurrentState | null;
  forecast: DayForecast[];
  chartLabels: string[];
  chartMax: number[];
  chartMin: number[];
  loading: boolean;
  error: string | null;
  buscarClima: (cidade: string) => Promise<void>;
}

export function useWeather(cidadeInicial = "Fortaleza"): UseWeatherReturn {
  const [cityName, setCityName]       = useState("");
  const [current, setCurrent]         = useState<CurrentState | null>(null);
  const [forecast, setForecast]       = useState<DayForecast[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartMax, setChartMax]       = useState<number[]>([]);
  const [chartMin, setChartMin]       = useState<number[]>([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState<string | null>(null);

  const buscarClima = useCallback(async (cidade: string) => {
    setLoading(true);
    setError(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results?.length) {
        setError("Cidade não encontrada. Tente novamente.");
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      const climaRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&timezone=auto&forecast_days=7`
      );
      const climaData: WeatherData = await climaRes.json();

      const { texto, emoji } = interpretarClima(climaData.current.weather_code);

      setCityName(name);
      setCurrent({
        temperatura: Math.round(climaData.current.temperature_2m),
        sensacao:    Math.round(climaData.current.apparent_temperature),
        umidade:     climaData.current.relative_humidity_2m,
        vento:       Math.round(climaData.current.wind_speed_10m),
        descricao:   texto,
        emoji,
      });

      setForecast(
        climaData.daily.time.slice(0, 6).map((d, i) => ({
          dia:   diaDaSemana(d),
          emoji: interpretarClima(climaData.daily.weather_code[i]).emoji,
          max:   Math.round(climaData.daily.temperature_2m_max[i]),
          min:   Math.round(climaData.daily.temperature_2m_min[i]),
        }))
      );

      setChartLabels(climaData.daily.time.map(diaDaSemana));
      setChartMax(climaData.daily.temperature_2m_max.map(Math.round));
      setChartMin(climaData.daily.temperature_2m_min.map(Math.round));

    } catch {
      setError("Erro ao buscar clima. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarClima(cidadeInicial);
  }, [cidadeInicial, buscarClima]);

  return { cityName, current, forecast, chartLabels, chartMax, chartMin, loading, error, buscarClima };
}