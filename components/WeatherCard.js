import styles from "../styles/WeatherCard.module.css";

// Textes de l'interface (changez-les ici, par exemple en anglais)
const LABELS = {
    title: "Météo",
    feelsLike: "Ressenti",
    humidity: "Humidité",
};

// Icônes pour les autres temps (le soleil de jour est dessiné en SVG)
const EMOJI = {
    "01": "🌙",
    "02": "⛅",
    "03": "☁️",
    "04": "☁️",
    "09": "🌧️",
    "10": "🌦️",
    "11": "⛈️",
    "13": "❄️",
    "50": "🌫️",
};

const WeatherIcon = ({ code }) => {
    // Ciel dégagé de jour : soleil avec anneau orange et points autour
    if (code === "01d") {
        return (
            <svg viewBox="0 0 100 100" className={styles.icon} aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180;
                    return (
                        <circle
                            key={i}
                            cx={50 + 43 * Math.cos(angle)}
                            cy={50 + 43 * Math.sin(angle)}
                            r="3.2"
                            fill="#FFA726"
                        />
                    );
                })}
                <circle cx="50" cy="50" r="24" fill="#FFF3E0" stroke="#FFA726" strokeWidth="9" />
            </svg>
        );
    }
    return <div className={styles.emoji}>{EMOJI[code.slice(0, 2)] ?? "🌡️"}</div>;
};

export const WeatherCard = ({ weatherData }) => {
    const { name, sys, main, weather } = weatherData;

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.back}>←</span>
                    <span>{LABELS.title}</span>
                </div>

                <div className={styles.body}>
                    <WeatherIcon code={weather[0].icon} />
                    <div className={styles.temp}>{Math.round(main.temp)}°C</div>
                    <div className={styles.description}>{weather[0].description}</div>
                    <div className={styles.location}>
                        📍 {name}, {sys.country}
                    </div>
                </div>

                <div className={styles.metrics}>
                    <div className={styles.metric}>
                        <span className={styles.metricIcon}>🌡️</span>
                        <div>
                            <strong>{Math.round(main.feels_like)}°C</strong>
                            <small>{LABELS.feelsLike}</small>
                        </div>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.metric}>
                        <span className={styles.metricIcon}>💧</span>
                        <div>
                            <strong>{Math.round(main.humidity)}%</strong>
                            <small>{LABELS.humidity}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};