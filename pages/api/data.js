import location from "../../config/location.json";
import { toOpenWeatherFormat } from "../../services/openMeteoAdapter";

export default async function handler(req, res) {
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current:
        "temperature_2m,apparent_temperature,relative_humidity_2m,pressure_msl,weather_code,is_day,wind_speed_10m,wind_direction_10m",
    hourly: "visibility",
    daily: "sunrise,sunset",
    timezone: "auto",
    timeformat: "unixtime",
    wind_speed_unit: "ms",
    forecast_days: 1,
  });

  try {
    const apiRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params}`
    );
    const data = await apiRes.json();

    // Open-Meteo signale les erreurs par { error: true, reason: "..." }
    if (data.error) {
      return res.status(200).json({ message: data.reason });
    }

    res.status(200).json(toOpenWeatherFormat(data, location));
  } catch (e) {
    res.status(200).json({ message: "Open-Meteo injoignable" });
  }
}