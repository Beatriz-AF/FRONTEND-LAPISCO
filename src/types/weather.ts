export interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather;
}

export interface WeatherInfo {
  texto: string;
  emoji: string;
}

export interface DayForecast {
  dia: string;
  emoji: string;
  max: number;
  min: number;
}