// weather_code (WMO) -> [description, code icône OpenWeather]
const WMO = {
    0: ["Ciel dégagé", "01"],
    1: ["Plutôt dégagé", "02"],
    2: ["Partiellement nuageux", "03"],
    3: ["Couvert", "04"],
    45: ["Brouillard", "50"],
    48: ["Brouillard givrant", "50"],
    51: ["Bruine légère", "09"],
    53: ["Bruine", "09"],
    55: ["Bruine dense", "09"],
    56: ["Bruine verglaçante", "09"],
    57: ["Bruine verglaçante dense", "09"],
    61: ["Pluie faible", "10"],
    63: ["Pluie", "10"],
    65: ["Pluie forte", "10"],
    66: ["Pluie verglaçante", "13"],
    67: ["Pluie verglaçante forte", "13"],
    71: ["Neige faible", "13"],
    73: ["Neige", "13"],
    75: ["Neige forte", "13"],
    77: ["Grains de neige", "13"],
    80: ["Averses faibles", "09"],
    81: ["Averses", "09"],
    82: ["Averses violentes", "09"],
    85: ["Averses de neige", "13"],
    86: ["Fortes averses de neige", "13"],
    95: ["Orage", "11"],
    96: ["Orage avec grêle", "11"],
    99: ["Orage violent avec grêle", "11"],
};

export const toOpenWeatherFormat = (data, location) => {
    const c = data.current;
    const [description, icon] = WMO[c.weather_code] ?? ["Inconnu", "03"];

    // Visibilité : donnée horaire -> on prend l'heure en cours
    const i = data.hourly.time.filter((t) => t <= c.time).length - 1;

    return {
        name: location.city,
        dt: c.time, // timestamp UTC (secondes)
        timezone: data.utc_offset_seconds, // décalage en secondes
        sys: {
            country: location.country,
            sunrise: data.daily.sunrise[0],
            sunset: data.daily.sunset[0],
        },
        main: {
            temp: c.temperature_2m, // °C
            feels_like: c.apparent_temperature,
            humidity: c.relative_humidity_2m,
            pressure: c.pressure_msl,
        },
        weather: [{ description, icon: icon + (c.is_day ? "d" : "n") }],
        wind: { speed: c.wind_speed_10m, deg: c.wind_direction_10m }, // m/s
        visibility: data.hourly.visibility[i], // mètres
    };
};