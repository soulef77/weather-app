import { useState, useEffect } from "react";

import { WeatherCard } from "../components/WeatherCard";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

const REFRESH_INTERVAL = 60 * 60 * 1000; // 1 heure

export const App = () => {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/data");
        const data = await res.json();
        // Si le rafraîchissement échoue, on garde les dernières bonnes données
        setWeatherData((prev) =>
            data.message && prev && !prev.message ? prev : data
        );
      } catch (e) {
        setWeatherData((prev) => prev ?? { message: "Erreur réseau" });
      }
    };

    getData();
    const timer = setInterval(getData, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return weatherData && !weatherData.message ? (
      <WeatherCard weatherData={weatherData} />
  ) : weatherData && weatherData.message ? (
      <ErrorScreen errorMessage="Météo indisponible pour le moment." />
  ) : (
      <LoadingScreen loadingMessage="Chargement des données..." />
  );
};

export default App;