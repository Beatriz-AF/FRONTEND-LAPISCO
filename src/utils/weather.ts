import { WeatherInfo } from "../types/weather";

export function interpretarClima(code: number): WeatherInfo {
  if (code === 0)               return { texto: "Ensolarado",           emoji: "☀️" };
  if (code <= 2)                return { texto: "Parcialmente nublado", emoji: "🌤️" };
  if (code === 3)               return { texto: "Nublado",              emoji: "☁️" };
  if (code >= 51 && code <= 67) return { texto: "Chuva leve",           emoji: "🌦️" };
  if (code >= 71 && code <= 77) return { texto: "Neve",                 emoji: "❄️" };
  if (code >= 80 && code <= 82) return { texto: "Chuva",                emoji: "🌧️" };
  if (code >= 95 && code <= 99) return { texto: "Tempestade",           emoji: "⛈️" };
  return { texto: "Variável", emoji: "🌈" };
}

export const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function diaDaSemana(dateISO: string): string {
  return DIAS_SEMANA[new Date(dateISO + "T12:00:00").getDay()];
}